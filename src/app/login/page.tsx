"use client";

import Link from "next/link";
import { Gamepad2, ChevronLeft } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen console-bg flex flex-col items-center justify-center p-4">
      <div className="glass-panel p-8 w-full max-w-md text-center animate-slide-up">
        <div className="flex justify-center mb-6">
          <Gamepad2 className="w-12 h-12 text-gaming-red" />
        </div>
        <h1 className="text-3xl font-black mb-2 text-white uppercase tracking-widest">Login</h1>
        <p className="text-gray-400 mb-8 font-medium">Connect your gamer profiles to continue.</p>
        
        <div className="space-y-4">
          <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
            Login with Discord
          </button>
          <button className="w-full bg-[#171a21] hover:bg-[#2a475e] text-white font-bold py-3 px-4 rounded-xl transition-colors border border-gray-700 flex items-center justify-center gap-2">
            Login with Steam
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <Link href="/discover" className="text-gaming-orange hover:text-white transition-colors text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Skip for Prototype
          </Link>
        </div>
      </div>
    </div>
  );
}
