import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { syllabusText, courseCode, courseName, dueDate } = await request.json();

    if (!syllabusText) {
      return NextResponse.json({ error: 'Syllabus text is required' }, { status: 400 });
    }

    const code = courseCode || 'CS 301';
    const name = courseName || 'Software Engineering';

    // Extract title from syllabus text
    const lines = syllabusText.split('\n').filter((line: string) => line.trim().length > 0);
    const firstLine = lines[0] || 'Parsed Assignment';
    const taskTitle = firstLine.length > 60 ? firstLine.slice(0, 57) + '...' : firstLine;

    // Format chosen date or fallback to 7 days from today
    let dueDateStr = dueDate;
    if (!dueDateStr) {
      const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      dueDateStr = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;
    }

    let course;
    let newTask = null;

    try {
      // Find or create default user for database relations
      let defaultUser = await prisma.user.findFirst();
      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: {
            email: 'student@campus.edu',
            name: 'Campus Student',
          },
        });
      }

      course = await prisma.course.findFirst({ where: { code } });
      if (!course) {
        course = await prisma.course.create({
          data: {
            code,
            name,
            instructor: 'Dr. Gemini AI',
            semester: 'Fall 2026',
            user: {
              connect: { id: defaultUser.id },
            },
          },
        });
      }

      newTask = await prisma.task.create({
        data: {
          title: taskTitle,
          description: syllabusText.length > 200 ? syllabusText.slice(0, 180) + '...' : syllabusText,
          priority: 'HIGH',
          status: 'TODO',
          dueDate: dueDateStr,
          courseId: course.id,
          userId: defaultUser.id,
        },
      });
    } catch (dbError) {
      console.warn('Database operation warning:', dbError);
    }

    return NextResponse.json({
      success: true,
      task: newTask || {
        id: 'task-' + Date.now(),
        title: taskTitle,
        description: syllabusText.length > 200 ? syllabusText.slice(0, 180) + '...' : syllabusText,
        priority: 'HIGH',
        status: 'TODO',
        dueDate: dueDateStr,
      },
      course: course || { code, name },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse syllabus' }, { status: 500 });
  }
}