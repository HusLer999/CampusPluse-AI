import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getListingGeneratorPrompt } from '@/lib/prompts/listing-generator';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const condition = searchParams.get('condition');
    const sort = searchParams.get('sort') || 'newest';

    const listings = await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        ...(category && { category }),
        ...(condition && { condition }),
        ...(search && {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        }),
      },
      include: {
        user: { select: { name: true, email: true } },
        images: true,
      },
      orderBy: sort === 'price-asc' ? { price: 'asc' } : sort === 'price-desc' ? { price: 'desc' } : { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, listings });
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
    const body = await req.json();

    // AI Listing Generator Helper Request
    if (body.action === 'ai-generate') {
      const { roughText } = body;
      if (!roughText) return NextResponse.json({ error: 'Rough text required' }, { status: 400 });

      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: { responseMimeType: 'application/json' }
      });
      const prompt = getListingGeneratorPrompt(roughText);
      const result = await model.generateContent(prompt);
      const generated = JSON.parse(result.response.text());

      return NextResponse.json({ success: true, generated });
    }

    // Standard Listing Creation
    const { title, description, price, category, condition, location, images } = body;
    if (!title || !price || !category || !condition || !location) {
      return NextResponse.json({ error: 'Missing required listing fields' }, { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: {
        userId,
        title,
        description: description || '',
        price: parseFloat(price),
        category,
        condition,
        location,
        images: {
          create: images ? images.map((url: string) => ({ url })) : [],
        },
      },
      include: { images: true },
    });

    return NextResponse.json({ success: true, listing });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}