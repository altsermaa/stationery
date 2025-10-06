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
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { Product } from "@/app/_components/ShowCards";

export type NewDish = {
  productName: string | undefined;
  price: number | undefined;
  description: string;
  image: string;
  categoryId: string;
};

export const UpdateProduct = ({ id }: { id: string }) => {
  const [singleProduct, setSingleProduct] = useState<Product>();

  const [productName, setProductName] = useState("");
  const handleProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const [price, setPrice] = useState<number | undefined>(undefined);
  const handleFoodPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const [description, setDescription] = useState("");
  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);


  useEffect(() => {
    const getProductInfo = async () => {
      const response = await axios.get(
        `https://onlineshop-sqmq.onrender.com/getSingleProduct/${id}`
      );
     
      setSingleProduct(response.data.fetchedData);
      setProductName(response.data.fetchedData.productName)
      setPrice(response.data.fetchedData.price); 
      setDescription(response.data.fetchedData.description);
      setImageUrl(response.data.fetchedData.image);
    };
    getProductInfo();
  }, [id]);

  const updateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let imageToUse = imageUrl;
      if (file) {
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
        imageToUse = img.secure_url;
      }
      await axios.put(
        "https://onlineshop-sqmq.onrender.com/updateSingleProduct",
        {
          _id: id,
          productName: productName,
          price: price,
          image: imageToUse,
          description: description,
        },
      );
      alert("Product updated successfully");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error updating product");
    }
  };

  const deleteProduct = async() => {
    const isConfirmed = window.confirm("Are you sure to delete this product?");
    if (!isConfirmed) return;
    
    try{
      await axios.delete("https://onlineshop-sqmq.onrender.com/admin/deleteProduct", 
        {
          data: {_id:id}
        }, 

      )
      alert("Product deleted successfully");
    }catch(err:any) {
      alert(err.response.data.message);
    }
  }

  if (!singleProduct) return null;

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link">
            <Pen className="text-black" id={id} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Product info</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <div className="flex gap-3">
              <Label htmlFor="productName">Product name</Label>
              <Input
                id="productName"
                name="productName"
                value={productName}
                onChange={handleProductName}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="description">Ingredients</Label>
              <Input
                id="description"
                name="description"
                defaultValue="List description"
                value={description}
                onChange={handleDescription}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="foodPrice">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={price}
                onChange={handleFoodPrice}
              />
            </div>
            <div className="flex gap-3">
              <ImageUpload
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setFile={setFile}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Trash className="text-red-600" onClick={deleteProduct}/>
            <Button type="submit" onClick={updateProduct}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
