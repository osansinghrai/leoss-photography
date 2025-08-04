import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';  // <-- Check this import path

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; // Assuming id is string (UUID), remove parseInt()

    const existingMessage = await prisma.contact_page.findUnique({
      where: { id }
    });

    if (!existingMessage) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    await prisma.contact_page.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
