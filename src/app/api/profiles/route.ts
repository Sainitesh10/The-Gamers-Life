import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let users = await prisma.user.findMany({
      include: { topGames: true }
    });

    // Auto-seed if database is empty (for demo purposes)
    if (users.length === 0) {
      console.log("Database empty. Auto-seeding mock profiles...");
      
      const gameValorant = await prisma.game.create({ data: { name: 'Valorant' } });
      const gameApex = await prisma.game.create({ data: { name: 'Apex Legends' } });
      const gameOW = await prisma.game.create({ data: { name: 'Overwatch 2' } });

      await prisma.user.create({
        data: {
          username: "NeonNinja",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=NeonNinja",
          playstyle: "Aggressive Fragger",
          rank: "Diamond",
          bio: "Looking for a reliable support main who doesn't mind me rushing in.",
          topGames: { connect: [{ id: gameValorant.id }, { id: gameApex.id }] }
        }
      });

      await prisma.user.create({
        data: {
          username: "PixelHealer",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelHealer",
          playstyle: "Tactical Support",
          rank: "Platinum",
          bio: "I keep the team alive. Let's chill on Stardew when we get tilted.",
          topGames: { connect: [{ id: gameOW.id }] }
        }
      });

      // Refetch after seeding
      users = await prisma.user.findMany({
        include: { topGames: true }
      });
    }

    // Format for frontend
    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      avatar_url: user.avatarUrl,
      playstyle: user.playstyle,
      rank: user.rank,
      bio: user.bio,
      top_games: user.topGames.map(g => g.name)
    }));

    return NextResponse.json(formattedUsers);

  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
  }
}
