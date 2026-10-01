import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { parseSyllabusWithGemini } from '@/lib/gemini';
import { getSyllabusParserPrompt } from '@/lib/prompts/syllabus-parser';
import { syllabusAIResponseSchema } from '@/lib/validations/schema';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { syllabusText } = await req.json();

    if (!syllabusText || typeof syllabusText !== 'string') {
      return NextResponse.json({ error: 'Syllabus text is required' }, { status: 400 });
    }

    // Generate prompt and call Gemini
    const prompt = getSyllabusParserPrompt(syllabusText);
    let rawAiData;
    
    try {
      rawAiData = await parseSyllabusWithGemini(prompt);
    } catch (e) {
      // Retry once on failure/invalid JSON format
      rawAiData = await parseSyllabusWithGemini(prompt);
    }

    // Validate with Zod
    const parsedData = syllabusAIResponseSchema.parse(rawAiData);

    // Save course and generated tasks to database
    const course = await prisma.course.create({
      data: {
        userId,
        name: parsedData.courseName,
        code: parsedData.courseCode,
        instructor: parsedData.instructor,
        meetingTimes: parsedData.meetingTimes,
        semester: parsedData.semester,
      },
    });

    if (parsedData.tasks && parsedData.tasks.length > 0) {
      await prisma.task.createMany({
        data: parsedData.tasks.map((t) => ({
          userId,
          courseId: course.id,
          title: t.title,
          description: t.description,
          dueDate: t.dueDate ? new Date(t.dueDate) : null,
          weight: t.weight || 0.0,
          priority: t.priority,
          estimateMin: t.estimateMin,
          isMilestone: t.isMilestone,
        })),
      });
    }

    return NextResponse.json({ success: true, courseId: course.id, data: parsedData });
  } catch (error: any) {
    console.error('Syllabus upload error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}