import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const { status, title, description, price } = await req.json();

    const listing = await prisma.listing.findUnique({ where: { id: params.id } });
    if (!listing || listing.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden or not found' }, { status: 403 });
    }

    const updated = await prisma.listing.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(title && { title }),
        ...(description && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
      },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = (session.user as any).id;

    const listing = await prisma.listing.findUnique({ where: { id: params.id } });
    if (!listing || listing.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden or not found' }, { status: 403 });
    }

    await prisma.listing.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true, message: 'Listing deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}