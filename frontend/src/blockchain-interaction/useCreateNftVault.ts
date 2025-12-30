import useWriteInstances from "./helpers/useWriteInstances";
import { toast } from "sonner";
import { decodeError } from "./helpers/decodeError";
import useUploadNFTImage from "./useUploadNFTImage";

const useCreateNFTVault = () => {
  const { writeInstances } = useWriteInstances();
  const { uploadNFTImage } = useUploadNFTImage();
  const createNFTVault = async (
    nftName: string,
    nftSymbol: string,
    image: File | null
  ) => {
    if (!image) {
      toast.error("NFT image is required");
      return;
    }

    try {
      const instances = await writeInstances();

      if (!instances) return;

      const { factoryInstance } = instances;

      const { ipfsLink: nftUri } = await uploadNFTImage(image);

      console.log(nftName);
      console.log(Symbol);
      console.log(nftUri);
      const tx = await factoryInstance.createNftVault(
        nftName,
        nftSymbol,
        nftUri
      );

      const receipt = await tx.wait();

      if (!receipt) return;

      toast.success("Vault created!", {
        action: { label: "Close", onClick: () => {} },
      });

      return true;
    } catch (error: any) {
      decodeError(error);
    }
  };

  return { createNFTVault };
};

export default useCreateNFTVault;
