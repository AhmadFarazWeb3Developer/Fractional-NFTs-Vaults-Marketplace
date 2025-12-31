import Footer from "@/components/Footer";
import Navbar from "../components/NavBar";
import {
  PieChartIcon,
  Vault,
  Users,
  Crown,
  ShoppingCartIcon,
  ArrowUpRight,
  Loader,
  ArrowDown,
} from "lucide-react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VaultType } from "@/types/Vault";
import { formatEther } from "ethers";
import { COLORS } from "@/lib/COLORS";
import VaultContext from "@/context/VaultContext";
import useSingleVault from "@/blockchain-interaction/useSingleVault";
import { useParams } from "react-router-dom";
import VaultShareChart from "@/components/VaultShareChart";
import useDepositNftToVault from "@/blockchain-interaction/useDepositNftToVault";
import { useAppKitAccount } from "@reown/appkit/react";

const SingleVaultPage = () => {
  const vaultContext = useContext(VaultContext);
  const navigate = useNavigate();
  const { vaultAddress } = useParams<{ vaultAddress: string }>();
  if (!vaultContext) throw new Error("VaultContext missing");

  const { address } = useAppKitAccount();

  const { areVaultsChanged, setAreVaultsChanged } = vaultContext;
  const [vault, setVault] = useState<VaultType | null>(null);
  const { depositNftToVault } = useDepositNftToVault();
  const { getSingleVault } = useSingleVault();

  if (!vaultAddress) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    const fetchVault = async () => {
      const freshVault = await getSingleVault(vaultAddress);
      setVault(freshVault);

      if (areVaultsChanged) {
        setAreVaultsChanged(false);
      }
    };

    fetchVault();
  }, [vaultAddress, areVaultsChanged]);

  const handlePullNft = async () => {
    if (!vaultAddress) return;
    await depositNftToVault(vaultAddress);
  };

  if (!vault) {
    return (
      <div className="min-h-screen bg-black  text-[#21e786]  flex items-center justify-center gap-2">
        <Loader className=" animate-spin " />
        Loading vault...
      </div>
    );
  }
  const {
    vaultOwner,
    tokenURI,
    NFTName,
    NFTSymbol,
    soldShares,
    floorPrice,
    allShareholderData,
  } = vault;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-black text-white py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-80 border-1 border-white/15 ">
            <img
              src={tokenURI.slice(0, -1)}
              alt={NFTName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl">{NFTName}</h1>
            <p className="text-lg text-white/80">{NFTSymbol.toUpperCase()}</p>
            <div className=" flex items-center gap-2  text-white/60 font-poppins justify-between">
              <div className="  flex items-center gap-2">
                <Vault strokeWidth={1} />
                <p className="text-sm text-white/60">{vaultAddress}</p>
              </div>
              <div className=" flex flex-row justify-center">
                {vault.vaultOwner === address && (
                  <div
                    onClick={handlePullNft}
                    className="w-full flex items-center justify-center   text-xs bg-[#21e786] text-black px-2 py-1 gap-1 cursor-pointer "
                  >
                    <p>Pull NFT</p>
                    <ArrowDown size={12} strokeWidth={2} />
                  </div>
                  // </div>
                )}
              </div>
            </div>
            <div className=" flex items-center gap-2   text-white/60  font-poppins">
              <Crown strokeWidth={1} />
              <p className="text-sm text-white/60">{vaultOwner}</p>
            </div>

            <p className="text-lg">Total Shares: {soldShares}</p>
            <p className="text-lg">Floor Price: {formatEther(floorPrice)}</p>
            <div className=" flex  gap-6">
              <div
                onClick={() =>
                  navigate("/single-vault/buy-shares", {
                    state: { vaultAddress },
                  })
                }
                className="w-1/2 flex items-center justify-center gap-2 bg-[#21e786] text-black py-3 cursor-pointer "
              >
                <p>Buy</p>
                <ShoppingCartIcon size={16} strokeWidth={3} />
              </div>

              <div
                onClick={() =>
                  navigate("/single-vault/withdraw-shares", {
                    state: { vaultAddress },
                  })
                }
                className="w-1/2 flex items-center justify-center gap-1 bg-[#21e786] text-black py-3 cursor-pointer "
              >
                <p className="">Withdraw</p>
                <ArrowUpRight size={16} strokeWidth={3} />
              </div>
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

              <tbody className="font-poppins">
                {allShareholderData.map((s, idx) => {
                  const percentage = (
                    (Number(s.shares) / Number(soldShares)) *
                    100
                  ).toFixed(2);
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white/5" : ""}>
                      <td className="px-4 py-2 ">
                        {s.shareholder.toLowerCase()}
                      </td>
                      <td className="px-4 py-2 ">{s.shares}</td>
                      <td className="px-4 py-2 ">
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

          <VaultShareChart vaultAddress={vaultAddress} />
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
                    value: Number(s.shares),
                  }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={30}
                  paddingAngle={3}
                  labelLine={false}
                  label={({ name, percent }) => {
                    const safePercent = percent ?? 0;

                    return (
                      <text
                        className="font-bakbak text-white text-sm"
                        fill="#fff"
                        fontWeight={700}
                        style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
                      >
                        {`${name}: ${(safePercent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {allShareholderData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [`${value ?? 0} shares`]}
                  contentStyle={{
                    backgroundColor: "#21e786",
                    border: "1px solid #000000",
                    color: "#fff",
                    fontFamily: "poppins",
                    padding: "10px 14px",
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
