const usePresignedUrl = () => {
  const fetchPresignedUrl = async (fileName: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL_V1}/uploaded-nft-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: fileName }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get presigned URL");
    }

    return await response.json();
  };
  return { fetchPresignedUrl };
};

export default usePresignedUrl;
