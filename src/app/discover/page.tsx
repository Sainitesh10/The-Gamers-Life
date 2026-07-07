"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Gamepad2, ChevronLeft, Heart, X, Sparkles } from "lucide-react";

interface GamerProfile {
  id: number;
  username: string;
  avatar_url: string;
  top_games: string[];
  playstyle: string;
  rank: string;
  bio: string;
}

export default function Discover() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<GamerProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch from internal Next.js Backend (SQLite database)
    fetch("/api/profiles")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to connect");
        return res.json();
      })
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch from Database");
        setLoading(false);
      });
  }, []);

  const handleMatch = async (id: number, action: 'accept' | 'reject') => {
    if (action === 'accept') {
      try {
        const res = await fetch(`/api/match/${id}`, { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          // Route to the new chat room!
          router.push(`/chat/${data.matchId}`);
          return; // Do not advance index, let it navigate away
        }
      } catch (e) {
        console.error(e);
      }
    }
    setCurrentIndex(prev => prev + 1);
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen console-bg flex flex-col selection:bg-red-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-panel rounded-none border-t-0 border-x-0 bg-zinc-950/80">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm font-bold">Return to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-black tracking-widest text-white">DISCOVER</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center relative z-50">
        {loading && (
          <div className="flex flex-col items-center animate-pulse">
            <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mb-4"></div>
            <p className="text-red-400 font-bold tracking-widest uppercase">Initializing Neural Link...</p>
          </div>
        )}

        {error && (
          <div className="glass-panel p-8 text-center border-red-500/30">
            <p className="text-red-400 font-bold uppercase tracking-widest mb-2">Connection Error</p>
            <p className="text-zinc-400">{error}</p>
            <p className="text-zinc-500 text-sm mt-4">Make sure the Python FastAPI backend is running on port 8000.</p>
          </div>
        )}

        {!loading && !error && currentIndex >= profiles.length && (
          <div className="glass-panel p-12 text-center border-red-500/30 animate-slide-up">
            <Sparkles className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wide">No More Matches</h2>
            <p className="text-zinc-400">You have exhausted the current player pool in your MMR bracket.</p>
          </div>
        )}

        {!loading && !error && currentProfile && (
          <div className="glass-panel w-full max-w-md overflow-hidden animate-slide-up relative group">
            {/* Holographic Header */}
            <div className="h-32 bg-zinc-900 relative flex items-center justify-center border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10"></div>
              <img 
                src={currentProfile.avatar_url} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full relative z-20 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] bg-zinc-800 translate-y-8" 
              />
            </div>
            
            {/* Profile Body */}
            <div className="p-8 pt-12 text-center">
              <h2 className="text-3xl font-black text-white mb-1 uppercase tracking-wider glow-text-primary">{currentProfile.username}</h2>
              <div className="flex justify-center gap-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-red-500/20 text-red-400 rounded border border-red-500/30">
                  {currentProfile.rank}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-orange-500/20 text-orange-400 rounded border border-orange-500/30">
                  {currentProfile.playstyle}
                </span>
              </div>
              
              <p className="text-zinc-300 font-medium mb-8">"{currentProfile.bio}"</p>
              
              <div className="text-left bg-zinc-950/50 p-4 rounded-xl border border-white/5 mb-8 relative z-50">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Top Played Games</p>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.top_games.map(game => (
                    <span key={game} className="text-sm font-semibold px-3 py-1 bg-white/5 text-zinc-300 rounded border border-white/10">
                      {game}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-6 mt-4 relative z-50">
                <button 
                  onClick={() => handleMatch(currentProfile.id, 'reject')}
                  className="w-16 h-16 rounded-full glass-panel flex items-center justify-center hover:bg-zinc-800/80 border-zinc-500/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all group/btn cursor-pointer"
                >
                  <X className="w-8 h-8 text-zinc-400 group-hover/btn:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={() => handleMatch(currentProfile.id, 'accept')}
                  className="w-16 h-16 rounded-full glass-panel flex items-center justify-center hover:bg-red-500/20 border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all group/btn cursor-pointer"
                >
                  <Heart className="w-8 h-8 text-red-400 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
