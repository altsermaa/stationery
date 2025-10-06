"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import { AddNewType } from "./AddProduct";


export const ImageUpload = ({ imageUrl, setImageUrl, setFile }: AddNewType) => {
  const fileHandler = (event: any) => {
    setFile(event?.target.files[0]);
    const imgUrl = URL.createObjectURL(event?.target.files[0]);
    setImageUrl(imgUrl);
  };

  return (
    <div>
      <Label htmlFor="productImage">Product Image</Label>
      <input
        type="file"
        id="productImage"
        onChange={fileHandler}
        name="productImage"
        // value="Choose a file or drag & drop it here"
      />
      {imageUrl && (
        <Image src={imageUrl} alt="image" width={400} height={400} />
      )}
    </div>
  );
};
