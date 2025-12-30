import useWriteInstances from "./helpers/useWriteInstances";
import { toast } from "sonner";
import { decodeError } from "./helpers/decodeError";
import useUploadNFTImage from "./useUploadNFTImage";
import { Log, LogDescription } from "ethers";

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

      const tx = await factoryInstance.createNftVault(
        nftName,
        nftSymbol,
        nftUri
      );

      const receipt = await tx.wait();

      if (!receipt) return;

      const ifac = factoryInstance.interface;

      console.log(ifac);
      const parsedLogs: LogDescription[] = receipt.logs
        .map((log: Log) => {
          try {
            return ifac.parseLog(log);
          } catch (error) {
            return null;
          }
        })
        .filter((e: LogDescription) => e !== null);

      console.log(parsedLogs);

      const createdVaultEvent = parsedLogs.find(
        (e) => e.name === "VaultCreated"
      );

      if (createdVaultEvent) {
        console.log(createdVaultEvent.args.owner);
        console.log(createdVaultEvent.args.vault);
        console.log(createdVaultEvent.args.nft);
      }

      const vaultAddress = createdVaultEvent?.args.vault;

      const response = await fetch(
        "http://localhost:8000/api/v1/create-vault",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vaultAddress }),
        }
      );

      console.log(await response.json());

      if (response.status !== 201) {
        throw new Error("Backend failed to store vault");
      }

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
