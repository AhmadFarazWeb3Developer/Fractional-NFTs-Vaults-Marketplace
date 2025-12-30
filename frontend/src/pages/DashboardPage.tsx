import { ArrowRight, Inbox } from "lucide-react";
import Navbar from "@/components/NavBar";

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bakbak mb-8">Vault Owner Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PANEL — VAULT LIST */}
          <div className="border border-white/15 bg-black p-5 space-y-4">
            <h2 className="text-lg font-poppins mb-4">Your Vaults</h2>

            {/* Vault Card */}
            <div className="border border-white/10 p-4 cursor-pointer hover:border-[#21e786] transition">
              <div className="text-sm text-white/60">NFT</div>
              <div className="text-lg">Crypto Punk #123</div>
              <div className="text-xs text-white/40 break-all mt-1">
                0xVaultAddressHere
              </div>
            </div>

            {/* Vault Card */}
            <div className="border border-white/10 p-4 cursor-pointer hover:border-[#21e786] transition">
              <div className="text-sm text-white/60">NFT</div>
              <div className="text-lg">Bored Ape #88</div>
              <div className="text-xs text-white/40 break-all mt-1">
                0xAnotherVaultAddress
              </div>
            </div>

            {/* Empty State */}
            <div className="border border-dashed border-white/10 p-6 text-center text-white/40 text-sm">
              <Inbox className="mx-auto mb-2" size={20} />
              No more vaults
            </div>
          </div>

          {/* RIGHT PANEL — DEPOSIT NFT */}
          <div className="lg:col-span-2 border border-white/15 bg-black p-6">
            <h2 className="text-xl font-bakbak mb-6">Deposit NFT to Vault</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* VAULT INFO */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-white/60">Selected Vault</div>
                  <div className="font-mono text-xs break-all">
                    0xVaultAddressHere
                  </div>
                </div>

                <div>
                  <div className="text-sm text-white/60">Vault NFT</div>
                  <div className="text-white">Crypto Punk (#123)</div>
                </div>

                <div className="border border-white/10 p-4">
                  <img
                    src="https://via.placeholder.com/400"
                    alt="NFT Preview"
                    className="w-full h-56 object-cover"
                  />
                </div>
              </div>

              {/* ACTION PANEL */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/70">
                    NFT Contract Address
                  </label>
                  <input
                    type="text"
                    placeholder="0x..."
                    className="w-full mt-1 px-3 py-2 bg-black border border-white/15 text-sm outline-none focus:border-[#21e786]"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/70">Token ID</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full mt-1 px-3 py-2 bg-black border border-white/15 text-sm outline-none focus:border-[#21e786]"
                  />
                </div>

                <button className="w-full mt-4 bg-[#21e786] text-black py-3 border border-black flex items-center justify-center gap-2 cursor-pointer">
                  Deposit NFT to Vault
                  <ArrowRight size={18} />
                </button>

                <p className="text-xs text-white/40">
                  Make sure this vault is approved to transfer your NFT.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
