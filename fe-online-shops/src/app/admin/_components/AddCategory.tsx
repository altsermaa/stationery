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

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const addNewCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!categoryName.trim()) {
        alert("Please enter a category name");
        return;
      }

      await axios.post("https://onlineshop-sqmq.onrender.com/createCategory", {
        categoryName: categoryName.trim(),
      });

      alert("Category added successfully!");
      setCategoryName("");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error adding category");
    }
  };

  return (
    <Dialog>
      <form >
        <DialogTrigger asChild>
          <Button variant="link">
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="categoryName">Category name</Label>
              <Input
                id="categoryName"
                name="categoryName"
                placeholder="Type category name"
                value={categoryName}
                onChange={handleCategoryName}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addNewCategory}>
              Add category
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}; 