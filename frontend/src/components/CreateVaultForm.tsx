import { useState } from "react";
import { ArrowRight } from "lucide-react";
import useCreateNFTVault from "../blockchain-interaction/useCreateNftVault";

interface Props {
  onSuccess: (vaultAddress: string) => void;
}

const CreateVaultForm = ({ onSuccess }: Props) => {
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [loading, setLoading] = useState(false);

  const { createNFTVault } = useCreateNFTVault();

  const handleCreateVault = async () => {
    setLoading(true);
    const vaultAddress = await createNFTVault(nftName, nftSymbol);
    setLoading(false);

    if (vaultAddress) {
      setNftName("");
      setNftSymbol("");
      onSuccess(vaultAddress);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bakbak">Create Vault</h1>

      <div className="space-y-2">
        <label className="text-sm text-white/60">NFT Name</label>
        <input
          value={nftName}
          onChange={(e) => setNftName(e.target.value)}
          placeholder="e.g. Azuki"
          className="w-full bg-black border border-white/20 px-2 py-3 text-white outline-none placeholder:font-poppins"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white/60">NFT Symbol</label>
        <input
          value={nftSymbol}
          onChange={(e) => setNftSymbol(e.target.value)}
          placeholder="e.g. Azk"
          className="w-full bg-black border border-white/20 px-2 py-3 text-white outline-none placeholder:font-poppins"
        />
      </div>

      <button
        onClick={handleCreateVault}
        disabled={loading}
        className="w-full bg-[#21e786] text-black py-4 flex items-center justify-center gap-2 cursor-pointer border border-black"
      >
        {loading ? "Creating Vault..." : "Create Vault"}
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default CreateVaultForm;
