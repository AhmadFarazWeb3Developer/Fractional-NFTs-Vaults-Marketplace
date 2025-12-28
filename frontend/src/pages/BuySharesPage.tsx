import { useState } from "react";
import { parseEther } from "ethers";
import Navbar from "@/components/NavBar";
import useBuyShares from "@/blockchain-interaction/useBuyShares";
import { useLocation, useNavigate } from "react-router-dom";
import { VaultAddress } from "@/types/Vault";

const BuySharesPage = () => {
  const [numberSharesToBuy, setNumberSharesToBuy] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as VaultAddress | null;

  if (!state?.vaultAddress) {
    navigate("/explore-vaults");
    return null;
  }

  const { buyShares } = useBuyShares();
  const handleBuyShares = async () => {
    await buyShares(numberSharesToBuy, state.vaultAddress);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="flex justify-center items-center px-4 mt-20">
        <div className="w-full max-w-md border border-white/15 bg-black p-8 space-y-6">
          <h2 className="text-xl text-white text-center">Buy Vault Shares</h2>

          <div className="space-y-2">
            <label className="text-sm text-white/60">Number of Shares</label>
            <input
              placeholder="e.g. 1.5"
              value={numberSharesToBuy}
              onChange={(e) => setNumberSharesToBuy(e.target.value)}
              className="w-full bg-transparent border border-white/20 px-4 py-3 outline-none text-white"
            />
          </div>

          <button
            onClick={handleBuyShares}
            disabled={loading}
            className="w-full bg-[#21e786] text-black py-3 cursor-pointer border border-black disabled:opacity-50"
          >
            {loading ? "Buying..." : "Buy Shares"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuySharesPage;
