import { useState } from "react";
import { parseEther } from "ethers";
import Navbar from "@/components/NavBar";

type BuySharesPageProps = {
  onBuyShares: (shares: bigint) => Promise<void>;
};

const BuySharesPage = ({ onBuyShares }: BuySharesPageProps) => {
  const [shares, setShares] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!shares || Number(shares) <= 0) return;

    try {
      setLoading(true);
      const sharesInWei = parseEther(shares);
      await onBuyShares(sharesInWei);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className=" w-full  flex flex-row  items-center justify-center">
        <div className=" min-h-screen flex flex-col items-center  w-1/2  bg-black border border-white/15 p-6 space-y-4">
          <h2 className="text-xl text-white ">Buy Vault Shares</h2>

          <input
            type="number"
            step="0.01"
            placeholder="Enter number of shares"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            className="w-full bg-transparent border border-white/20 px-4 py-3 outline-none"
          />

          <button
            onClick={handleBuy}
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
