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
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { Plus } from "lucide-react";

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
  const [subCategories, setSubCategories] = useState<{_id: string, subCategoryName: string}[]>([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>("");

  const [quantity, setQuantity] = useState<number>(0);
  const [isNewIn, setIsNewIn] = useState<boolean>(false);
  const [isHoliday, setIsHoliday] = useState<boolean>(false);

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

      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add a product");
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
      const productData: any = {
        productName: productName,
        price: price,
        image: img.secure_url,
        description: description,
        categoryId: selectedCategoryId,
        quantity: quantity,
        isNewIn: isNewIn,
        isHoliday: isHoliday,
      };

      // Only add subCategoryId if one is selected
      if (selectedSubCategoryId) {
        productData.subCategoryId = selectedSubCategoryId;
      }

      await axios.post(
        "http://localhost:8000/createProduct",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added!");
      setProductName("");
      setPrice(undefined);
      setDescription("");
      setSelectedCategoryId("");
      setSelectedSubCategoryId("");
      setSubCategories([]);
      setQuantity(0);
      setIsNewIn(false);
      setIsHoliday(false);
      setImageUrl(null);
      setFile(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error adding product");
    }
  };

  useEffect(()=> {
    const getCategory = async() => {
      const response = await axios.get("http://localhost:8000/getCategories");
      console.log(response.data.fetchedData)
      setCategories(response.data.fetchedData)
    }; 
    getCategory()
  }, [])

  // Fetch subcategories when category changes
  useEffect(() => {
    const getSubCategories = async () => {
      if (selectedCategoryId) {
        try {
          // Use query parameter to filter subcategories by category on the backend
          const response = await axios.get(
            `http://localhost:8000/getAllSubCategories?categoryId=${selectedCategoryId}`
          );
          setSubCategories(response.data.subCategories || []);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          setSubCategories([]);
        }
      } else {
        setSubCategories([]);
        setSelectedSubCategoryId("");
      }
    };
    getSubCategories();
  }, [selectedCategoryId]);


  return (
    <Dialog>
      <form >
        <DialogTrigger asChild>
          <Button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-xl border-2 border-gray-200">
          <DialogHeader className="border-b border-gray-200 pb-4">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Add New Product
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="productName" className="text-sm font-semibold text-gray-700">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productName"
                  name="productName"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={handleProductName}
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                  Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  name="price"
                  placeholder="Enter price"
                  type="number"
                  value={price}
                  onChange={handleProductPrice}
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                Description <span className="text-red-500">*</span>
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter product description"
                value={description}
                onChange={handleIDescription}
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="quantity" className="text-sm font-semibold text-gray-700">
                Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                id="quantity"
                name="quantity"
                placeholder="Enter quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Product Status</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isNewIn" 
                  checked={isNewIn}
                  onCheckedChange={(checked) => setIsNewIn(checked as boolean)}
                />
                <label
                  htmlFor="isNewIn"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mark as New Arrival
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isHoliday" 
                  checked={isHoliday}
                  onCheckedChange={(checked) => setIsHoliday(checked as boolean)}
                />
                <label
                  htmlFor="isHoliday"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mark as Holiday Item
                </label>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="categoryName" className="text-sm font-semibold text-gray-700">
                  Category <span className="text-red-500">*</span>
                </Label>
                <select 
                value={selectedCategoryId}
                onChange={e => setSelectedCategoryId(e.target.value)}
                required
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white">
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
              
              {selectedCategoryId && subCategories.length > 0 && (
                <div className="grid gap-3">
                  <Label htmlFor="subCategoryName" className="text-sm font-semibold text-gray-700">
                    Sub-category <span className="text-gray-400 text-xs font-normal">(optional)</span>
                  </Label>
                  <select 
                  value={selectedSubCategoryId}
                  onChange={e => setSelectedSubCategoryId(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white">
                    <option value="">
                    None / Select a sub-category
                    </option>
                    {
                      subCategories.map((subCategory) => (
                         <option key={subCategory._id} value={subCategory._id}>{subCategory.subCategoryName}</option>
                      ))
                    }
                  </select>
                </div>
              )}
            </div>

            <div className="grid gap-3">
              <Label className="text-sm font-semibold text-gray-700">
                Product Image <span className="text-red-500">*</span>
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <ImageUpload
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  setFile={setFile}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="border-t border-gray-200 pt-4">
            <Button 
              type="submit" 
              onClick={addNewProduct}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
