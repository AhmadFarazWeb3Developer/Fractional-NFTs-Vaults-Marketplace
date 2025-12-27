import Footer from "@/components/Footer";
import Navbar from "../components/NavBar";
import { PieChartIcon, Users, Vault } from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { VaultType } from "@/types/Vault";

type LocationState = {
  vault: VaultType;
};

const SingleVaultPage = () => {
  // const vault = {
  //   name: "Azuki #9605",
  //   symbol: "AZK",
  //   image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=600",
  //   vaultAddress: "0x1234567890abcdef1234567890abcdef12345678",
  //   owner: "0xOWNERADDRESS1234567890",
  //   totalShares: 100,
  //   shareholders: [
  //     { address: "0xAAA...111", shares: 40 },
  //     { address: "0xBBB...222", shares: 30 },
  //     { address: "0xCCC...333", shares: 20 },
  //     { address: "0xDDD...444", shares: 10 },
  //   ],
  // };

  const COLORS = ["#21e786", "#00bfff", "#ff6347", "#ffa500"];
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  if (!state?.vault) {
    navigate("/");
    return null;
  }
  const {
    vaultAddress,
    vaultOwner,
    tokenURI,
    NFTName,
    NFTSymbol,
    totalShareHolders,
    soldShares,
    floorPrice,
    allShareholderData,
  } = state.vault;

  console.log(vaultAddress);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-black text-white py-8">
        {/* NFT & Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-80">
            <img
              src={tokenURI.slice(0, -1)}
              alt={NFTName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl">{NFTName}</h1>
            <p className="text-lg text-white/80">{NFTSymbol.toUpperCase()}</p>
            <p className="text-sm text-white/60">
              Vault Address: <span className="font-mono">{vaultAddress}</span>
            </p>
            <p className="text-sm text-white/60">
              Vault Owner: <span className="font-mono">{vaultOwner}</span>
            </p>
            <p className="text-lg">Total Shares: {soldShares}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() =>
                  navigate("/single-vault/BuyShares", {
                    state: { vaultAddress },
                  })
                }
                className="w-1/2 bg-[#21e786] text-black py-3 cursor-pointer border border-black"
              >
                Buy
              </button>
              <button className="w-1/2 bg-[#21e786] text-black py-3 cursor-pointer border border-black">
                Withdraw
              </button>
            </div>
          </div>
        </div>

        <div className="bg-black border border-white/15 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
            <Users size={20} /> <h2 className="text-lg">Shareholders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="bg-white/10 text-white/70 font-poppins">
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">Shares</th>
                  <th className="px-4 py-3 text-left">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {allShareholderData.map((s, idx) => {
                  const percentage = (
                    (parseInt(soldShares) / 100) *
                    100
                  ).toFixed(2);
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white/5" : ""}>
                      <td className="px-4 py-2 font-poppins">
                        {s.shareholder}
                      </td>
                      <td className="px-4 py-2 font-poppins">{s.shares}</td>
                      <td className="px-4 py-2 font-poppins">
                        <div className="h-2 w-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: COLORS[idx % COLORS.length],
                            }}
                          />
                        </div>
                        <span className="text-xs text-white/60">
                          {percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center gap-6 bg-black border border-white/15 p-6">
          <div className="">
            <div className="flex flex-row items-center gap-2">
              <PieChartIcon size={24} strokeWidth={1.5} />
              <h3 className="text-lg mb-1">Vault Shares Distribution</h3>
            </div>
            <p className="text-white/60 font-poppins">
              Visual representation of share distribution among all vault
              participants.
            </p>
          </div>

          <div className="w-full md:w-1/2 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allShareholderData.map((s) => ({
                    name: s.shareholder,
                    value: s.shares,
                  }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={30}
                  paddingAngle={3}
                  labelLine={false}
                  label={({ name, percent }) => (
                    <text
                      className="font-bakbak text-white text-sm"
                      fill="#fff"
                      fontWeight={700}
                      style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  )}
                >
                  {allShareholderData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value} shares`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#21e786",
                    // borderRadius: 12,
                    border: "1px solid #000000",
                    color: "#fff",
                    fontFamily: "poppins",
                    padding: "10px 14px",
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{
                    color: "#21e786",
                    fontFamily: "poppins",
                    fontSize: 12,
                    marginTop: 8,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleVaultPage;
