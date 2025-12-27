import { useState } from "react";
import { Upload } from "lucide-react";

interface Props {
  vaultAddress: string;
}

const UploadNFTImageForm = ({ vaultAddress }: Props) => {
  const [image, setImage] = useState<File | null>(null);

  const handleUpload = () => {
    if (!image) return;
    console.log("Vault:", vaultAddress);
    console.log("Image:", image);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bakbak">Upload NFT Image</h1>

      <div className="border border-white/20 p-6">
        <input
          type="file"
          accept="image/*"
          id="nft-image"
          className="hidden"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <label
          htmlFor="nft-image"
          className="block text-center text-white/60 cursor-pointer"
        >
          {image ? image.name : "Click to upload NFT image"}
        </label>
      </div>

      <button
        onClick={handleUpload}
        className="w-full bg-[#21e786] text-black py-4 cursor-pointer border border-black"
      >
        Upload Image
      </button>
    </div>
  );
};

export default UploadNFTImageForm;
