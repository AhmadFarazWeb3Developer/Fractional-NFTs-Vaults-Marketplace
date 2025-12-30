import { useState } from "react";
import useClaimNft from "@/blockchain-interaction/useClaimNft";
import Navbar from "@/components/NavBar";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ClaimNftPage = () => {
  const navigate = useNavigate();
  const { vaultAddress } = useParams<{ vaultAddress: string }>();
  const { claimNft, loading } = useClaimNft();
  const [receiver, setReceiver] = useState("");

  const handleClaimNFT = async () => {
    if (!receiver || !vaultAddress) return;
    try {
      await claimNft(vaultAddress, receiver);
      alert("NFT claimed successfully!");
      navigate(-1); // go back after success
    } catch (err) {
      console.error(err);
      alert("Claim failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-xl mx-auto mt-20 border border-white/15 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-poppins">Claim NFT</h1>
          <p className="text-sm text-white/60 mt-1">
            Enter the address where the NFT should be transferred.
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-sm text-white/70">Receiver Address</label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="0x..."
            className="w-full bg-black border border-white/20 px-4 py-3 text-white outline-none focus:border-[#21e786]"
          />
        </div>

        <div className="border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 text-sm p-4 mb-8 font-poppins">
          ⚠️ This action is irreversible. Make sure the address is correct.
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-white/20 px-5 py-3 text-white/80 hover:bg-white/5 transition cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            onClick={handleClaimNFT}
            disabled={loading}
            className="flex items-center gap-2 bg-[#21e786] text-black px-6 py-3 border border-black hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            {loading ? "Claiming..." : "Confirm Claim"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimNftPage;
