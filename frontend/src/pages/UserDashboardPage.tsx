import { useState, useContext, useEffect } from "react";
import Navbar from "@/components/NavBar";
import { Vault, PieChart } from "lucide-react";
import UserShares from "@/components/UserShares";
import { VaultType, UserVaultShare, VaultAddress } from "../types/Vault";
import useSingleVault from "@/blockchain-interaction/useSingleVault";
import AllVaults from "@/components/AllVaults";
import VaultContext from "@/context/VaultContext";
import useGetUserVaultsAddresses from "@/blockchain-interaction/useGetUserVaultsAddresses";
import { useAppKitAccount } from "@reown/appkit/react";
import useAllVaultsAddresses from "@/blockchain-interaction/useAllVaultsAddresses";
import Footer from "@/components/Footer";

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"vaults" | "shares">("vaults");
  const [allvaults, setAllVaults] = useState<VaultType[]>([]);
  const [userVaults, setUserVaults] = useState<VaultType[]>([]);
  const [userShares, setUserShares] = useState<UserVaultShare[]>([]);

  const { address } = useAppKitAccount();

  const vaultContext = useContext(VaultContext);
  if (!vaultContext) throw new Error("VaultContext missing");
  const { areVaultsChanged, setAreVaultsChanged } = vaultContext;

  const { allVaultsAddresses, loading } = useAllVaultsAddresses();
  const { getUserVaultsAddresses } = useGetUserVaultsAddresses();
  const { getSingleVault } = useSingleVault();

  useEffect(() => {
    if (!allVaultsAddresses || !address) return;

    const init = async () => {
      // ALL VAULTS
      const allVaultsData = await Promise.all(
        allVaultsAddresses.map((v: VaultAddress) =>
          getSingleVault(v.vaultAddress)
        )
      );

      setAllVaults(allVaultsData);

      // USER VAULTS
      const userVaultsAddresses = await getUserVaultsAddresses();
      if (!userVaultsAddresses?.userVaults) return;

      const { userVaults } = userVaultsAddresses;
      const vaultsData = await Promise.all(
        userVaults.map((v: VaultAddress) => getSingleVault(v.vaultAddress))
      );

      setUserVaults(vaultsData);

      // USER SHARES
      const sharesResult: UserVaultShare[] = [];

      for (const vault of allVaultsData) {
        const userData = vault.allShareholderData.find(
          (s) => s.shareholder.toLowerCase() === address.toLowerCase()
        );

        if (!userData) continue;

        const userSharesNum = Number(userData.shares);
        const totalShares = Number(vault.soldShares);

        sharesResult.push({
          vaultAddress: vault.vaultAddress,
          NFTName: vault.NFTName,
          NFTSymbol: vault.NFTSymbol,
          userShares: userSharesNum,
          totalShares,
          ownershipPercent: (userSharesNum / totalShares) * 100,
          status:
            userSharesNum === totalShares
              ? "Full Ownership"
              : userSharesNum > 0
              ? "Partial"
              : "Active",
        });
      }

      setUserShares(sharesResult);

      if (areVaultsChanged) setAreVaultsChanged(false);
    };

    init();
  }, [areVaultsChanged, allVaultsAddresses, address]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex max-w-7xl mx-auto mt-8">
        <div className="w-1/4 border-r border-white/15 flex flex-col space-y-4 pr-6">
          <button
            onClick={() => setActiveTab("vaults")}
            className={`flex items-center gap-2 px-4 py-3  border border-white/15 cursor-pointer ${
              activeTab === "vaults"
                ? "bg-[#21e786] text-black"
                : "text-white/80"
            }`}
          >
            <Vault size={18} /> My Vaults
          </button>

          <button
            onClick={() => setActiveTab("shares")}
            className={`flex items-center gap-2 px-4 py-3  border border-white/15 cursor-pointer ${
              activeTab === "shares"
                ? "bg-[#21e786] text-black"
                : "text-white/80"
            }`}
          >
            <PieChart size={18} /> My Shares
          </button>
        </div>

        <div className="w-full  pl-6">
          {activeTab === "vaults" && <AllVaults vaults={userVaults} />}
          {activeTab === "shares" && (
            <UserShares userShares={userShares} vaults={allvaults} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;
