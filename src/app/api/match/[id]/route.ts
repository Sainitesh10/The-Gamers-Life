import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const targetUserId = parseInt(id, 10);
    
    // In a real app with auth, this would be the logged-in user's ID
    // For prototype, we will create a dummy session user if none exists
    let sessionUser = await prisma.user.findUnique({ where: { username: "AdminPlayer1" } });
    if (!sessionUser) {
      sessionUser = await prisma.user.create({
        data: {
          username: "AdminPlayer1",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminPlayer1",
          playstyle: "Strategist",
          rank: "Master",
          bio: "Looking for a serious duo partner."
        }
      });
    }

    // Create the Match in the database
    const match = await prisma.match.create({
      data: {
        userAId: sessionUser.id,
        userBId: targetUserId,
        status: "CHATTING",
        quest: {
          create: {
            description: "Play 3 unrated matches together and coordinate on voice chat.",
            isCompleted: false
          }
        }
      }
    });
    
    return NextResponse.json({ success: true, matchId: match.id });
  } catch (error) {
    console.error("Match error:", error);
    return NextResponse.json({ error: "Failed to process match" }, { status: 500 });
  }
}
