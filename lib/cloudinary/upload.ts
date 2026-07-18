import { cloudinary } from "@/lib/cloudinary/client";

export type UploadedImage = {
  url: string;
  publicId: string;
  width: number;
  height: number;
};

export async function uploadImage(file: File): Promise<UploadedImage> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "the-thirteen",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}