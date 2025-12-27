import usePresignedUrl from "./helpers/usePresignedUrl";

const useUploadNFTImage = () => {
  const { fetchPresignedUrl } = usePresignedUrl();

  const uploadNFTImage = async (file: File) => {
    try {
      const { signedUrlData } = await fetchPresignedUrl(file.name);

      const uploadUrl = signedUrlData.data;

      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Upload failed:", uploadResponse.status, errorText);
        throw new Error(`Upload failed: ${uploadResponse.status}`);
      }

      const uploadResult = await uploadResponse.json();

      const cid = uploadResult.data?.cid;
      if (!cid) {
        throw new Error("No CID returned from upload");
      }

      const ipfsLink = `https://${
        import.meta.env.VITE_PINATA_GATEWAY
      }/ipfs/${cid}`;

      return {
        success: true,
        cid,
        ipfsLink,
      };
    } catch (error) {
      console.error("Error uploading NFT image:", error);
      throw error;
    }
  };

  return { uploadNFTImage };
};

export default useUploadNFTImage;
