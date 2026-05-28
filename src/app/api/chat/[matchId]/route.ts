import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper to filter out phone numbers and social links
function applyPrivacyFilter(text: string) {
  // Catch 7-11 digit numbers with common separators (-, ., space)
  let filtered = text.replace(/(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/g, "[CENSORED BY SYSTEM]");
  
  // Catch common social handle patterns (rudimentary but effective for prototype)
  filtered = filtered.replace(/(discord\.gg|instagram\.com|snapchat\.com|ig:?|snap:?|discord:?)[\s]*[a-zA-Z0-9_\-\.]+/gi, "[CENSORED BY SYSTEM]");
  
  return filtered;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params;
    
    const messages = await prisma.message.findMany({
      where: { matchId },
      orderBy: { createdAt: 'asc' },
      include: { sender: true }
    });
    
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params;
    const { text, senderId } = await request.json();

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { quest: true }
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    // Apply the filter if the match hasn't reached REVEALED status
    let processedText = text;
    if (match.status !== "REVEALED") {
      processedText = applyPrivacyFilter(text);
    }

    const message = await prisma.message.create({
      data: {
        text: processedText,
        matchId,
        senderId
      },
      include: { sender: true }
    });

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
