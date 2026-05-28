import Link from "next/link";
import { Gamepad2, Users, Trophy, ChevronRight, Zap, Target, Sparkles } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Algorithm Matchmaking",
      description: "Our neural net analyzes your playstyle, MMR, and favorite genres to find your perfect Player 2."
    },
    {
      icon: Zap,
      title: "Real-Time Sync",
      description: "Connect your Steam, Xbox Live, and PSN accounts for automatic game library matching."
    },
    {
      icon: Trophy,
      title: "Achievement Hunting",
      description: "Find partners specifically for co-op campaigns, ranked grinding, or 100% completion runs."
    }
  ];

  return (
    <div className="min-h-screen console-bg flex flex-col selection:bg-red-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 relative glass-panel rounded-none border-t-0 border-x-0 bg-zinc-950/50 pointer-events-auto">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <Gamepad2 className="w-8 h-8 text-red-500 relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
            </div>
            <h1 className="text-2xl font-black tracking-widest text-white">
              THE<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">GAMERS</span>LIFE
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/login" className="text-zinc-400 hover:text-white font-medium transition-colors text-sm uppercase tracking-wider">
              Login
            </Link>
            <Link href="/discover" className="glass-panel px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 glow-border-primary transition-all relative z-50">
              Initiate
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 py-24 md:py-32 flex flex-col items-center justify-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-orange-500/30 text-orange-400 text-sm font-bold tracking-widest mb-10 shadow-[0_0_20px_rgba(249,115,22,0.2)] animate-slide-up">
          <Sparkles className="w-4 h-4" />
          <span>V3.0 MATCHMAKING ENGINE ONLINE</span>
        </div>
        
        <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter text-white drop-shadow-2xl animate-slide-up delay-100">
          FIND YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 glow-text-primary">
            PLAYER 2
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium animate-slide-up delay-200">
          Stop solo-queuing. Match with verified gamers who play what you play, when you play. The ultimate ecosystem for gaming romance.
        </p>
        
        <div className="flex gap-6 justify-center flex-wrap animate-slide-up delay-300 relative z-50">
          <Link href="/discover" className="group relative bg-red-500 text-white px-10 py-5 text-lg font-black uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.6)] hover:-translate-y-1 transition-all flex items-center gap-2 overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <span className="relative z-10">Start Discovering</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>

      {/* Features Console Menu */}
      <section className="container mx-auto px-4 pb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className={`glass-panel p-8 group hover:bg-white/5 transition-all hover:-translate-y-2 cursor-crosshair animate-slide-up delay-${(index + 1) * 100}`}>
              <div className="w-16 h-16 rounded-2xl bg-zinc-900/50 flex items-center justify-center mb-6 border border-white/5 group-hover:border-red-500/30 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all">
                <feature.icon className="w-8 h-8 text-zinc-500 group-hover:text-red-400 transition-colors" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-white tracking-wide uppercase">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
