import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params;
    
    // Find the match
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { quest: true }
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    // Upgrade the Match status to REVEALED
    await prisma.match.update({
      where: { id: matchId },
      data: { status: "REVEALED" }
    });
    
    // Mark the quest as completed
    if (match.quest) {
      await prisma.quest.update({
        where: { id: match.quest.id },
        data: { isCompleted: true }
      });
    }

    return NextResponse.json({ success: true, message: "Quest completed! Identity revealed." });
  } catch (error) {
    console.error("Quest completion error:", error);
    return NextResponse.json({ error: "Failed to complete quest" }, { status: 500 });
  }
}
