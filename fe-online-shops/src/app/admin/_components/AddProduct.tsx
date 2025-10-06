import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImageUpload } from "./ImageUpload";

export type AddNewType = {
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
  setFile: Dispatch<SetStateAction<File | null>>;
};

export const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const handleProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const [price, setPrice] = useState<number | undefined>(undefined);
  const handleProductPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const [description, setDescription] = useState("");
  const handleIDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

    const [categories, setCategories] = useState<{_id: string, categoryName: string} []>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(""); 

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const addNewProduct = async (event: React.FormEvent) => {
    console.log("hi")
    event.preventDefault();
    try {
      if (!file) {
        alert("Please select a file");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "onlineshop");

      const result = await fetch(
        "https://api.cloudinary.com/v1_1/dz8b3asdf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const img = await result.json();
      await axios.post("https://onlineshop-sqmq.onrender.com/createProduct", {
        productName: productName, // fixed typo
        price: price,
        image: img.secure_url,
        description: description,
        categoryId: selectedCategoryId,
      });

      alert("Product added!");
      setProductName("");
      setPrice(undefined);
      setDescription("");
      setSelectedCategoryId("");
      setImageUrl(null);
      setFile(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error adding product");
    }
  };

  useEffect(()=> {
  const getCategory = async() => {
    const response = await axios.get("https://onlineshop-sqmq.onrender.com/getCategories");
    console.log(response.data.fetchedData)
    setCategories(response.data.fetchedData)
  }; getCategory()
  }, [])


  return (
    <Dialog>
      <form >
        <DialogTrigger asChild>
         
            Add product
          
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add new product </DialogTitle>
          </DialogHeader>
          <div className="flex gap-6">
            <div className="grid gap-3">
              <Label htmlFor="productName">Product name</Label>
              <Input
                id="productName"
                name="productName"
                placeholder="Type product name"
                value={productName}
                onChange={handleProductName}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                placeholder="Enter price"
                type="number"
                value={price}
                onChange={handleProductPrice}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="List description"
                value={description}
                onChange={handleIDescription}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="categoryName">Category name</Label>
              <select 
              value={selectedCategoryId}
              onChange={e => setSelectedCategoryId(e.target.value)}
              required>
                <option value="">
                Select a category
                </option>
                {
                  categories.map((category) => (
                     <option key={category._id} value={category._id}>{category.categoryName}</option>
                  ))
                }
              </select>
            </div>
            <div className="grid gap-3">
              <ImageUpload
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setFile={setFile}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer" onClick={addNewProduct}>
              Add product
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
