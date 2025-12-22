import { TrendingUp, Users, Lock, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "../components/NavBar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E5E7EB]">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 border-2">
          <div className="flex-1 space-y-8 max-w-2xl">
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">
                Own a {""}
                <span className="bg-gradient-to-r from-[#7C5CFF] via-[#9D7EFF] to-[#7C5CFF] bg-clip-text text-transparent animate-gradient">
                  Fraction
                </span>
                <br />
                of Premium
                <br />
                <span className="text-[#E5E7EB]/80">NFTs</span>
              </h1>

              <p className="text-xl lg:text-2xl text-[#E5E7EB]/60 leading-relaxed max-w-xl font-light">
                Invest in high-value NFTs without breaking the bank.{" "}
                <span className="text-[#2ECC71]">Buy fractional shares</span>,
                earn from price appreciation, and trade anytime.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-5 pt-4">
              <button className="group relative bg-gradient-to-r from-[#7C5CFF] to-[#9D7EFF] text-white px-10 py-5 rounded-xl font-semibold transition-all hover:scale-105 shadow-2xl shadow-[#7C5CFF]/30 hover:shadow-[#7C5CFF]/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center gap-2">
                  Explore Vaults
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="bg-[#121826] text-white px-10 py-5 rounded-xl font-semibold border-2 border-white/10 hover:border-[#7C5CFF]/50 transition-all hover:scale-105 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex-1 relative h-[650px] lg:h-[750px] w-full max-w-[600px] flex items-center justify-center">
            {/* Enhanced Glow Effect */}
            <div className="absolute inset-0 bg-[#7C5CFF]/20 blur-[120px] rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CFF]/10 via-transparent to-[#2ECC71]/10 blur-3xl"></div>

            {/* Card 3 - Bottom */}
            <div
              className="absolute w-[340px] sm:w-[380px] lg:w-[420px] h-[500px] sm:h-[540px] lg:h-[580px] bg-[#0d1117] rounded-3xl border border-purple-500/20 shadow-[0_20px_80px_rgba(124,92,255,0.15)] overflow-hidden backdrop-blur-sm transition-all duration-700 hover:border-purple-500/40 hover:shadow-[0_30px_100px_rgba(124,92,255,0.25)]"
              style={{
                transform: "rotate(-15deg) translateY(50px) translateX(-30px)",
                zIndex: 1,
              }}
            >
              <div className="w-full h-[300px] sm:h-[320px] lg:h-[340px] bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
              </div>
              <div className="p-7 space-y-5 bg-gradient-to-b from-transparent to-[#0d1117]/80">
                <div className="space-y-1">
                  <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                    Punk Collection
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    CryptoPunk #3100
                  </h3>
                </div>
                <div className="flex justify-between items-center py-4 border-y border-white/5">
                  <span className="text-sm text-[#E5E7EB]/40 uppercase tracking-wide">
                    Floor Price
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#2ECC71] to-[#27AE60] bg-clip-text text-transparent">
                    4,500 ETH
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#E5E7EB]/40 uppercase tracking-wide">
                      Ownership Progress
                    </span>
                    <span className="text-sm font-bold text-white">
                      45 / 100
                    </span>
                  </div>
                  <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="absolute inset-0 h-full w-[45%] bg-gradient-to-r from-purple-500 via-purple-400 to-pink-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Middle */}
            <div
              className="absolute w-[340px] sm:w-[380px] lg:w-[420px] h-[500px] sm:h-[540px] lg:h-[580px] bg-[#0d1117] rounded-3xl border border-cyan-500/20 shadow-[0_20px_80px_rgba(34,211,238,0.15)] overflow-hidden backdrop-blur-sm transition-all duration-700 hover:border-cyan-500/40 hover:shadow-[0_30px_100px_rgba(34,211,238,0.25)]"
              style={{
                transform: "rotate(-8deg) translateY(25px) translateX(0px)",
                zIndex: 2,
              }}
            >
              <div className="w-full h-[300px] sm:h-[320px] lg:h-[340px] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
              </div>
              <div className="p-7 space-y-5 bg-gradient-to-b from-transparent to-[#0d1117]/80">
                <div className="space-y-1">
                  <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                    Ape Collection
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    Bored Ape #8817
                  </h3>
                </div>
                <div className="flex justify-between items-center py-4 border-y border-white/5">
                  <span className="text-sm text-[#E5E7EB]/40 uppercase tracking-wide">
                    Floor Price
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#2ECC71] to-[#27AE60] bg-clip-text text-transparent">
                    52.5 ETH
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#E5E7EB]/40 uppercase tracking-wide">
                      Ownership Progress
                    </span>
                    <span className="text-sm font-bold text-white">
                      67 / 100
                    </span>
                  </div>
                  <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="absolute inset-0 h-full w-[67%] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 1 - Top (Featured) */}
            <div
              className="absolute w-[340px] sm:w-[380px] lg:w-[420px] h-[500px] sm:h-[540px] lg:h-[580px] bg-[#0d1117] rounded-3xl border-2 border-[#7C5CFF]/60 shadow-[0_30px_100px_rgba(124,92,255,0.3)] overflow-hidden backdrop-blur-sm hover:border-[#7C5CFF] hover:shadow-[0_40px_120px_rgba(124,92,255,0.4)] transition-all duration-700 cursor-pointer hover:scale-[1.03] group"
              style={{
                transform: "rotate(0deg)",
                zIndex: 3,
              }}
            >
              <div className="w-full h-[300px] sm:h-[320px] lg:h-[340px] bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/50 to-transparent group-hover:via-transparent transition-all duration-500"></div>

                {/* Hot Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71] bg-[length:200%_100%] animate-gradient text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(46,204,113,0.6)] flex items-center gap-2 border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span className="tracking-wider">TRENDING</span>
                </div>

                {/* Floating Price Tag */}
                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                  <div className="text-xs text-white/60 mb-0.5">
                    Starting at
                  </div>
                  <div className="text-lg font-bold text-white">0.152 ETH</div>
                </div>
              </div>

              <div className="p-7 space-y-5 bg-gradient-to-b from-transparent to-[#0d1117]/80">
                <div className="space-y-1">
                  <div className="text-xs text-orange-400 font-semibold uppercase tracking-wider">
                    Azuki Collection
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    Azuki #9605
                  </h3>
                </div>
                <div className="flex justify-between items-center py-4 border-y border-white/5">
                  <span className="text-sm text-[#E5E7EB]/40 uppercase tracking-wide">
                    Floor Price
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#2ECC71] to-[#27AE60] bg-clip-text text-transparent">
                    15.2 ETH
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#E5E7EB]/40 uppercase tracking-wide">
                      Ownership Progress
                    </span>
                    <span className="text-sm font-bold text-white">
                      82 / 100
                    </span>
                  </div>
                  <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="absolute inset-0 h-full w-[82%] bg-gradient-to-r from-orange-500 via-orange-400 to-red-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-[#7C5CFF] via-[#9D7EFF] to-[#7C5CFF] bg-[length:200%_100%] hover:bg-[position:100%_0] text-white py-4 rounded-xl font-bold text-base hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_40px_rgba(124,92,255,0.3)] hover:shadow-[0_15px_50px_rgba(124,92,255,0.5)] flex items-center justify-center gap-2 border border-white/10 group/btn">
                  <span>Buy Shares Now</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Stats */}
      <div className="flex flex-wrap gap-8 pt-8 border-t border-white/5">
        <div>
          <div className="text-3xl font-bold text-white mb-1">$2.4M+</div>
          <div className="text-sm text-[#E5E7EB]/50">Total Locked</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white mb-1">1.2K+</div>
          <div className="text-sm text-[#E5E7EB]/50">Investors</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white mb-1">47</div>
          <div className="text-sm text-[#E5E7EB]/50">Active Vaults</div>
        </div>
      </div>

      {/* Feature Cards Section - Below 100vh */}
      <div className="px-6 lg:px-12 xl:px-20 py-20 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Why Choose Fractional Vaults?
            </h2>
            <p className="text-lg text-[#E5E7EB]/60">
              Experience the future of NFT investing with our innovative
              features
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex-1 min-w-[280px] max-w-[340px] bg-gradient-to-br from-[#121826] to-[#1a1f2e] p-8 rounded-2xl border border-white/5 hover:border-[#2ECC71]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#2ECC71]/10 group cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-[#2ECC71]/20 to-[#2ECC71]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-[#2ECC71] w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Price Appreciation
              </h3>
              <p className="text-[#E5E7EB]/60 leading-relaxed">
                Every share purchase increases vault price by{" "}
                <span className="text-[#2ECC71] font-semibold">0.1%</span>.
                Early investors benefit most from growing demand.
              </p>
            </div>

            <div className="flex-1 min-w-[280px] max-w-[340px] bg-gradient-to-br from-[#121826] to-[#1a1f2e] p-8 rounded-2xl border border-white/5 hover:border-[#7C5CFF]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#7C5CFF]/10 group cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-[#7C5CFF]/20 to-[#7C5CFF]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="text-[#7C5CFF] w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Collective Ownership
              </h3>
              <p className="text-[#E5E7EB]/60 leading-relaxed">
                Join forces with other investors. Each vault divides into{" "}
                <span className="text-[#7C5CFF] font-semibold">
                  100 fractional shares
                </span>{" "}
                for accessible entry.
              </p>
            </div>

            <div className="flex-1 min-w-[280px] max-w-[340px] bg-gradient-to-br from-[#121826] to-[#1a1f2e] p-8 rounded-2xl border border-white/5 hover:border-[#E74C3C]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#E74C3C]/10 group cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-[#E74C3C]/20 to-[#E74C3C]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="text-[#E74C3C] w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Secure Vaults
              </h3>
              <p className="text-[#E5E7EB]/60 leading-relaxed">
                NFTs safely locked in{" "}
                <span className="text-[#E74C3C] font-semibold">
                  audited smart contracts
                </span>
                . Transparent, trustless, and fully on-chain.
              </p>
            </div>

            <div className="flex-1 min-w-[280px] max-w-[340px] bg-gradient-to-br from-[#121826] to-[#1a1f2e] p-8 rounded-2xl border border-white/5 hover:border-[#2ECC71]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#2ECC71]/10 group cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-[#2ECC71]/20 to-[#2ECC71]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-[#2ECC71] w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Withdraw Anytime
              </h3>
              <p className="text-[#E5E7EB]/60 leading-relaxed">
                Redeem your shares instantly at{" "}
                <span className="text-[#2ECC71] font-semibold">
                  current market value
                </span>
                . Full liquidity, no lock-up periods.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
