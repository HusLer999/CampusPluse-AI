import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getTransitBriefingPrompt } from '@/lib/prompts/transit-briefing';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const routeTag = searchParams.get('routeTag');
    const type = searchParams.get('type');

    const now = new Date();

    // Fetch active (non-expired) posts
    const posts = await prisma.transitPost.findMany({
      where: {
        expiresAt: { gt: now },
        ...(routeTag && { routeTag }),
        ...(type && { type }),
      },
      include: { user: { select: { name: true } }, votes: true },
      orderBy: { createdAt: 'desc' },
    });

    // Generate short AI briefing using Gemini
    let briefing = 'All campus transit routes are currently operating on normal schedules.';
    if (posts.length > 0) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const prompt = getTransitBriefingPrompt(posts.slice(0, 5));
        const aiResult = await model.generateContent(prompt);
        briefing = aiResult.response.text();
      } catch (err) {
        console.error('Transit AI briefing error:', err);
      }
    }

    return NextResponse.json({ success: true, posts, briefing });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const { type, routeTag, title, details, expiryHours = 6 } = await req.json();

    if (!type || !routeTag || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const expiresAt = new Date(Date.now() + expiryHours * 60 * 60 * 1000);

    const post = await prisma.transitPost.create({
      data: {
        userId,
        type,
        routeTag,
        title,
        details: details || '',
        expiresAt,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}