import { useState, useContext } from "react";
import useWithdrawShares from "@/blockchain-interaction/useWithdrawShares";
import { useLocation, useNavigate } from "react-router-dom";
import { VaultAddress } from "@/types/Vault";
import { ArrowUpRight, Loader } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import VaultContext from "@/context/VaultContext";

const WithdrawSharesPage = () => {
  const [numberOfSharesToWithdraw, setNumberOfSharesToBuy] = useState("");

  const vaultContext = useContext(VaultContext);
  if (!vaultContext) throw new Error("VaultContext missing");

  const { setAreVaultsChanged } = vaultContext;

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as VaultAddress | null;

  if (!state?.vaultAddress) {
    navigate("/explore-vaults");
    return null;
  }

  const { withdrawShares, loading } = useWithdrawShares();
  const handleWithdrawShares = async () => {
    const result = await withdrawShares(
      numberOfSharesToWithdraw,
      state?.vaultAddress
    );

    if (result === true) {
      setAreVaultsChanged(true);
      navigate(`/single-vault/${state.vaultAddress}`);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md border border-white/15 bg-black p-6 space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-xl text-white">Withdraw Shares</h2>
            <p className="text-sm text-white/60 font-poppins">
              Redeem your vault shares to receive ETH
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/60 font-poppins">
              Shares to redeem
            </label>
            <input
              placeholder="e.g. 2.5"
              value={numberOfSharesToWithdraw}
              onChange={(e) => setNumberOfSharesToBuy(e.target.value)}
              className="w-full bg-transparent border border-white/20 px-4 py-3 outline-none text-white"
            />
          </div>

          <button
            onClick={handleWithdrawShares}
            disabled={loading}
            className="w-full bg-[#21e786] text-black py-3 cursor-pointer border border-black disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className=" flex gap-2  items-center justify-center">
                <Loader className="animate-spin" />
                <p>Withdrawing...</p>
              </div>
            ) : (
              <div className=" flex gap-2 items-center justify-center">
                <p>Withdraw Shares</p>
                <ArrowUpRight size={16} />
              </div>
            )}
          </button>

          <p className="text-xs text-white/40 font-poppins text-center">
            You will receive ETH proportional to your redeemed shares
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WithdrawSharesPage;
