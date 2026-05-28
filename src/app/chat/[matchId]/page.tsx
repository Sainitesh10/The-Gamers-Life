"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Send, Shield, Trophy, Target, Video, Phone, CheckCircle, Flame } from "lucide-react";
import Link from "next/link";

interface Message {
  id: number;
  text: string;
  senderId: number;
  sender: { username: string; avatarUrl: string };
}

export default function ChatRoom({ params }: { params: Promise<{ matchId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const matchId = resolvedParams.matchId;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [matchStatus, setMatchStatus] = useState("CHATTING"); // CHATTING, REVEALED
  const [quest, setQuest] = useState<{ id: number; description: string; isCompleted: boolean } | null>(null);

  // Hardcode Session ID for prototype
  const SESSION_USER_ID = 1; 

  // Fetch initial match info & messages
  useEffect(() => {
    // In a real app we'd fetch the match metadata here. For prototype we'll derive it from the messages API if needed, 
    // or just fetch messages directly.
    const fetchChat = async () => {
      const res = await fetch(`/api/chat/${matchId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    };

    fetchChat();
    // Simplified polling
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, [matchId]);

  // For the prototype, we simulate fetching the match status and quest manually here
  useEffect(() => {
    // Hardcoded dummy quest for the prototype to avoid complex API setup
    setQuest({
      id: 1,
      description: "Play 3 unrated matches together and coordinate on voice chat.",
      isCompleted: matchStatus === "REVEALED"
    });
  }, [matchStatus]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Optimistic UI
    const tempMsg = {
      id: Date.now(),
      text: inputText,
      senderId: SESSION_USER_ID,
      sender: { username: "You", avatarUrl: "" }
    };
    setMessages(prev => [...prev, tempMsg]);
    setInputText("");

    await fetch(`/api/chat/${matchId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: tempMsg.text, senderId: SESSION_USER_ID })
    });
  };

  const completeQuest = async () => {
    const res = await fetch(`/api/quests/${matchId}/complete`, { method: "POST" });
    if (res.ok) {
      setMatchStatus("REVEALED");
      setQuest(prev => prev ? { ...prev, isCompleted: true } : null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gaming-dark text-white">
      {/* HEADER */}
      <header className="border-b border-gaming-red/20 bg-gaming-dark/80 backdrop-blur-md p-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/discover" className="text-gray-400 hover:text-white transition-colors">
            <span className="text-sm font-bold tracking-widest uppercase">← Back</span>
          </Link>
          <div className="h-6 w-[1px] bg-gaming-red/30 mx-2"></div>
          <span className="font-bold text-gaming-red flex items-center gap-2">
            <Shield className="w-5 h-5" /> Secure Comms
          </span>
        </div>
        {matchStatus === "REVEALED" && (
          <div className="flex gap-4">
            <button className="text-gaming-orange hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="text-gaming-orange hover:text-white transition-colors">
              <Video className="w-5 h-5" />
            </button>
          </div>
        )}
      </header>

      {/* QUEST TRACKER */}
      <div className="p-4 bg-gaming-red/5 border-b border-gaming-red/10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${matchStatus === "REVEALED" ? "bg-green-500/20 text-green-400" : "bg-gaming-orange/20 text-gaming-orange"}`}>
              {matchStatus === "REVEALED" ? <CheckCircle className="w-6 h-6" /> : <Target className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Active Co-op Mission</h3>
              <p className="text-white font-medium">{quest?.description}</p>
              {matchStatus !== "REVEALED" && (
                <p className="text-xs text-gaming-red mt-1 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Identity Locked until mission completion
                </p>
              )}
            </div>
          </div>
          
          {matchStatus !== "REVEALED" ? (
            <button 
              onClick={completeQuest}
              className="px-6 py-2 bg-gradient-to-r from-gaming-red to-gaming-orange rounded-full font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(255,51,102,0.5)] transition-all shrink-0"
            >
              Mission Complete
            </button>
          ) : (
            <div className="px-6 py-2 bg-green-500/20 text-green-400 rounded-full font-bold uppercase tracking-wider border border-green-500/30 flex items-center gap-2">
              <Flame className="w-4 h-4" /> Unlocked
            </div>
          )}
        </div>
      </div>

      {/* CHAT LOG */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-3xl mx-auto w-full space-y-6">
          <div className="text-center py-6">
            <span className="px-4 py-1 rounded-full bg-gaming-red/10 border border-gaming-red/20 text-xs font-bold text-gaming-orange uppercase tracking-widest">
              Connection Established
            </span>
          </div>

          {messages.map(msg => {
            const isMe = msg.senderId === SESSION_USER_ID;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl p-4 ${
                  isMe 
                    ? "bg-gradient-to-br from-gaming-red/80 to-gaming-orange/80 rounded-tr-sm" 
                    : "bg-gray-800/80 border border-gray-700 rounded-tl-sm"
                }`}>
                  {!isMe && (
                    <span className="text-xs font-bold text-gray-400 mb-1 block">
                      {msg.sender?.username || "Unknown Gamer"}
                    </span>
                  )}
                  <p className="text-white leading-relaxed">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INPUT */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-black/50 border border-gray-700 rounded-full px-6 py-3 focus:outline-none focus:border-gaming-red transition-colors text-white placeholder-gray-500"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 bg-gaming-red hover:bg-gaming-orange rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
          {matchStatus !== "REVEALED" && (
            <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> System Privacy Filters Active. Do not share contact info.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
