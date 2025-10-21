"use client";
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
import { useState } from "react";
import { X, Plus } from "lucide-react";

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [newSubCategory, setNewSubCategory] = useState("");

  const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleNewSubCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubCategory(event.target.value);
  };

  const addSubCategory = () => {
    if (newSubCategory.trim()) {
      setSubCategories([...subCategories, newSubCategory.trim()]);
      setNewSubCategory("");
    }
  };

  const removeSubCategory = (index: number) => {
    setSubCategories(subCategories.filter((_, i) => i !== index));
  };

  const addNewCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!categoryName.trim()) {
        alert("Please enter a category name");
        return;
      }

      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add a category");
        return;
      }

      // Create category first
      const categoryResponse = await axios.post(
        "http://localhost:8000/createCategory",
        {
          categoryName: categoryName.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Get the created category ID from the response
      const createdCategory = categoryResponse.data.category;

      // Create subcategories if any
      if (subCategories.length > 0 && createdCategory?._id) {
        const subCategoryPromises = subCategories.map((subCategoryName) =>
          axios.post(
            "http://localhost:8000/createSubCategory",
            {
              subCategoryName,
              categoryId: createdCategory._id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );

        await Promise.all(subCategoryPromises);
        alert(`Category and ${subCategories.length} subcategory(ies) added successfully!`);
      } else {
        alert("Category added successfully!");
      }

      setCategoryName("");
      setSubCategories([]);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error adding category");
    }
  };

  return (
    <Dialog>
      <form >
        <DialogTrigger asChild>
          <Button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto bg-white rounded-xl border-2 border-gray-200">
          <DialogHeader className="border-b border-gray-200 pb-4">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Add New Category
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-3">
              <Label htmlFor="categoryName" className="text-sm font-semibold text-gray-700">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="categoryName"
                name="categoryName"
                placeholder="Enter category name"
                value={categoryName}
                onChange={handleCategoryName}
                required
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2"
              />
            </div>

            <div className="grid gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <Label htmlFor="subCategories" className="text-sm font-semibold text-gray-700">
                Sub-categories <span className="text-gray-400 text-xs font-normal">(optional)</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="subCategories"
                  name="subCategories"
                  placeholder="Enter subcategory name"
                  value={newSubCategory}
                  onChange={handleNewSubCategory}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSubCategory();
                    }
                  }}
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2 bg-white"
                />
                <Button
                  type="button"
                  onClick={addSubCategory}
                  className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              
              {subCategories.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Sub-categories to be added ({subCategories.length})
                  </p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {subCategories.map((subCat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-700">{subCat}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubCategory(index)}
                          className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="border-t border-gray-200 pt-4">
            <Button 
              type="submit" 
              onClick={addNewCategory}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Category{subCategories.length > 0 && ` with ${subCategories.length} Sub-${subCategories.length === 1 ? 'category' : 'categories'}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}; 