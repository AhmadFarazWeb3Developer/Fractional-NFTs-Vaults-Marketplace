import { useState } from "react";
import { ArrowRight } from "lucide-react";
import useCreateNFTVault from "../blockchain-interaction/useCreateNftVault";

const CreateVaultPage = () => {
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");

  const { createNFTVault } = useCreateNFTVault();
  const handleCreateVault = async () => {
    const result = await createNFTVault(nftName, nftSymbol);
    if (result === true) {
      setNftName("");
      setNftSymbol("");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
      <div className="w-full max-w-[480px] border border-white/15 p-8 space-y-6">
        <h1 className="text-3xl font-bakbak">Create Vault</h1>

        <div className="space-y-2">
          <label className="text-sm text-white/60">NFT Name</label>
          <input
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            className="w-full bg-black border border-white/20 px-4 py-3 text-white outline-none placeholder:font-poppins"
            placeholder="e.g. Azuki Vault"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/60">NFT Symbol</label>
          <input
            value={nftSymbol}
            onChange={(e) => setNftSymbol(e.target.value)}
            className="w-full bg-black border border-white/20 px-4 py-3 text-white outline-none placeholder:font-poppins"
            placeholder="e.g. AZUKI"
          />
        </div>

        <button
          onClick={handleCreateVault}
          className="w-full bg-[#21e786] text-black py-4  flex items-center justify-center gap-2 cursor-pointer border border-black"
        >
          Create Vault
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CreateVaultPage;
