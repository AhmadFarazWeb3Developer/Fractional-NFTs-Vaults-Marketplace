import { useState } from "react";
import Navbar from "@/components/NavBar";
import useBuyShares from "@/blockchain-interaction/useBuyShares";
import { useLocation, useNavigate } from "react-router-dom";
import { VaultAddress } from "@/types/Vault";
import { Loader, ShoppingCart } from "lucide-react";

const BuySharesPage = () => {
  const [numberOfSharesToBuy, setNumberOfSharesToBuy] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as VaultAddress | null;

  if (!state?.vaultAddress) {
    navigate("/explore-vaults");
    return null;
  }

  const { buyShares, loading } = useBuyShares();
  const handleBuyShares = async () => {
    const result = await buyShares(numberOfSharesToBuy, state?.vaultAddress);

    if (result === true) {
      navigate("/explore-vaults");
    }
  };

  return (
    <div className="min-h-screen  bg-black">
      <Navbar />

      <div className="flex justify-center items-center px-4 mt-20">
        <div className="w-full max-w-md border border-white/15 bg-black p-8 space-y-6">
          <h2 className="text-xl text-white text-center">Buy Vault Shares</h2>

          <div className="space-y-2">
            <label className="text-sm text-white/60">Number of Shares</label>
            <input
              placeholder="e.g. 1.5"
              value={numberOfSharesToBuy}
              onChange={(e) => setNumberOfSharesToBuy(e.target.value)}
              className="w-full bg-transparent border border-white/20 px-4 py-3 outline-none text-white"
            />
          </div>

          <button
            onClick={handleBuyShares}
            disabled={loading}
            className="w-full bg-[#21e786] text-black py-3 cursor-pointer border border-black disabled:opacity-50"
          >
            {loading ? (
              <div className=" flex gap-2 items-center justify-center">
                <Loader className="animate-spin " />
                <p>Buying...</p>
              </div>
            ) : (
              <div className=" flex gap-2 items-center justify-center">
                <p>Buy Shares</p>
                <ShoppingCart size={18} strokeWidth={3} />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuySharesPage;
