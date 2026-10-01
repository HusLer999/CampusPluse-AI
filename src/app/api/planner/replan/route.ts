import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getReplanPrompt } from '@/lib/prompts/replan';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = (session.user as any).id;

    // Fetch incomplete tasks
    const incompleteTasks = await prisma.task.findMany({
      where: { userId, status: { not: 'DONE' } },
      include: { course: true },
    });

    if (incompleteTasks.length === 0) {
      return NextResponse.json({ message: 'No incomplete tasks to re-plan!' });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = getReplanPrompt(incompleteTasks, 14); // e.g. 14 days horizon
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    const suggestedPlan = JSON.parse(textResponse);

    return NextResponse.json({ success: true, suggestedPlan });
  } catch (error: any) {
    console.error('Re-plan error:', error);
    return NextResponse.json({ error: 'Failed to generate re-plan' }, { status: 500 });
  }
}