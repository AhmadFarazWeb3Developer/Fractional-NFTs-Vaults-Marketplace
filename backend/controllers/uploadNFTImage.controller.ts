import { Request, Response } from "express";

const getUploadedNFTUrl = async (req: Request, res: Response) => {
  try {
    const { filename } = req.body;

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const payload = {
      network: "public",
      expires: 30,
      date: Math.floor(Date.now() / 1000), //  mandatory
      filename: filename,
      allow_mime_types: ["image/*"],
      max_file_size: 5000000,
    };

    const urlRequest = await fetch(
      "https://uploads.pinata.cloud/v3/files/sign",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const signedUrlData = await urlRequest.json();

    return res.status(200).json({
      signedUrlData,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Failed to create signed URL",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default getUploadedNFTUrl;
