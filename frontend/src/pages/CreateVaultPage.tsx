import { useState } from "react";
import { ArrowRight, Loader, Upload } from "lucide-react";
import useCreateNFTVault from "../blockchain-interaction/useCreateNftVault";
import Navbar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";

const CreateVaultPage = () => {
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const navigate = useNavigate();
  const { createNFTVault } = useCreateNFTVault();

  const handleCreateVault = async () => {
    setLoading(true);
    const vaultAddress = await createNFTVault(nftName, nftSymbol, image);
    setLoading(false);

    if (vaultAddress) {
      setNftName("");
      setNftSymbol("");
      setImage(null);
      navigate("/explore-vaults");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-black flex items-center  px-6 text-white">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          {/* LEFT — FORM */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bakbak">Create Vault</h1>

            <div className="space-y-2">
              <label className="text-sm text-white/60">NFT Name</label>
              <input
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                placeholder="e.g. Azuki"
                className="w-full bg-black border border-white/20 px-3 py-3 text-white outline-none placeholder:font-poppins"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">NFT Symbol</label>
              <input
                value={nftSymbol}
                onChange={(e) => setNftSymbol(e.target.value)}
                placeholder="e.g. AZK"
                className="w-full bg-black border border-white/20 px-3 py-3 text-white outline-none placeholder:font-poppins"
              />
            </div>

            <button
              onClick={handleCreateVault}
              disabled={loading}
              className="w-full bg-[#21e786] text-black py-4 flex items-center justify-center gap-2 cursor-pointer border border-black"
            >
              {loading ? (
                <div className=" flex gap-2">
                  <Loader className="animate-spin " />
                  <p>Creating Vault...</p>
                </div>
              ) : (
                "Create Vault"
              )}
              <ArrowRight size={18} />
            </button>
          </div>

          <div className=" flex items-center justify-center w-full  border border-white/20">
            <div className=" p-6 flex items-center justify-center min-h-[260px]">
              <input
                type="file"
                accept="image/*"
                id="nft-image"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />

              <label
                htmlFor="nft-image"
                className="w-full h-full flex items-center justify-center cursor-pointer"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="NFT Preview"
                    className="max-h-64 object-contain"
                  />
                ) : (
                  <div className=" flex flex-col  items-center justify-center gap-2">
                    <Upload size={30} className=" text-white/60" />
                    <span className="text-white/60 text-center font-poppins">
                      Click to upload NFT image
                    </span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVaultPage;
