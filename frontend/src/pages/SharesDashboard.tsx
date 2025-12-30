import Navbar from "@/components/NavBar";
import { PieChart, Layers, TrendingUp } from "lucide-react";

const SharesDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bakbak mb-8">My Share Holdings</h1>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="border border-white/15 p-5">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Layers size={16} />
              Total Vaults
            </div>
            <div className="text-3xl mt-2">4</div>
          </div>

          <div className="border border-white/15 p-5">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <TrendingUp size={16} />
              Total Shares
            </div>
            <div className="text-3xl mt-2">2,450</div>
          </div>

          <div className="border border-white/15 p-5">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <PieChart size={16} />
              Ownership %
            </div>
            <div className="text-3xl mt-2">18.4%</div>
          </div>
        </div>

        {/* VAULT SHARES TABLE */}
        <div className="border border-white/15 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-poppins">
              Vault-wise Share Distribution
            </h2>
          </div>

          <table className="w-full text-sm font-poppins">
            <thead className="text-white/60 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-3">Vault</th>
                <th className="text-left px-6 py-3">Shares</th>
                <th className="text-left px-6 py-3">Ownership</th>
                <th className="text-left px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {/* ROW */}
              <tr className="border-b border-white/5">
                <td className="px-6 py-4">
                  <div className="text-white">Crypto Punk Vault</div>
                  <div className="text-xs text-white/40">0xVaultAddress1</div>
                </td>

                <td className="px-6 py-4">1000</td>

                <td className="px-6 py-4">
                  <div className="w-full h-2 bg-white/10">
                    <div
                      className="h-full bg-[#21e786]"
                      style={{ width: "40%" }}
                    />
                  </div>
                  <span className="text-xs text-white/60">40%</span>
                </td>

                <td className="px-6 py-4 text-[#21e786]">Active</td>
              </tr>

              {/* ROW */}
              <tr className="border-b border-white/5 bg-white/5">
                <td className="px-6 py-4">
                  <div className="text-white">Bored Ape Vault</div>
                  <div className="text-xs text-white/40">0xVaultAddress2</div>
                </td>

                <td className="px-6 py-4">450</td>

                <td className="px-6 py-4">
                  <div className="w-full h-2 bg-white/10">
                    <div
                      className="h-full bg-[#21e786]"
                      style={{ width: "18%" }}
                    />
                  </div>
                  <span className="text-xs text-white/60">18%</span>
                </td>

                <td className="px-6 py-4 text-white/60">Partial</td>
              </tr>

              {/* ROW */}
              <tr>
                <td className="px-6 py-4">
                  <div className="text-white">Art Blocks Vault</div>
                  <div className="text-xs text-white/40">0xVaultAddress3</div>
                </td>

                <td className="px-6 py-4">1000</td>

                <td className="px-6 py-4">
                  <div className="w-full h-2 bg-white/10">
                    <div
                      className="h-full bg-[#21e786]"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <span className="text-xs text-[#21e786]">100%</span>
                </td>

                <td className="px-6 py-4 text-[#21e786]">Full Ownership</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SharesDashboard;
