import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const { postId, isUp } = await req.json();

    // Upsert vote (change or create vote)
    await prisma.transitVote.upsert({
      where: { postId_userId: { postId, userId } },
      update: { isUp },
      create: { postId, userId, isUp },
    });

    // Recalculate total upvotes score
    const votes = await prisma.transitVote.findMany({ where: { postId } });
    const upvotesCount = votes.filter((v) => v.isUp).length - votes.filter((v) => !v.isUp).length;

    const updatedPost = await prisma.transitPost.update({
      where: { id: postId },
      data: { upvotes: Math.max(0, upvotesCount) },
    });

    return NextResponse.json({ success: true, updatedPost });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}