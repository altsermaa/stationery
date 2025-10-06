"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useCart } from "./CartProvider";
import { Input } from "@/components/ui/input";
import { OrderedItem } from "./OrderedItem";
import { Product } from "./ShowCards";
import { z } from "zod";


export type ProductOrderItemType = {
  product: Product;
  addcount: number;
};

enum ProductOrderEnum {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

const orderSchema = z.object({
  address: z.string().min(1, "Address is required"),
  phoneNumber1: z.string().min(1, "Phone number is required"),
  phoneNumber2: z.string().min(1, "Second phone number is required"),
});

export const Order = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setCart, cartCount } = useCart();
  console.log(cart)

  const [address, setAddress] = useState("");
  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const [phoneNumber1, setPhoneNumber1] = useState("");
  const handlePhoneNumber1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber1(event.target.value);
  };

  const [phoneNumber2, setPhoneNumber2] = useState("");
  const handlePhoneNumber2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber2(event.target.value);
  };

  const [formError, setFormError] = useState<string | null>(null);

  const handleOpen = () => setIsOpen(true);

  const handleSubmit = async () => {
    const result = orderSchema.safeParse({
      address,
      phoneNumber1,
      phoneNumber2,
    });

    if (!result.success) {
      setFormError(result.error.issues[0].message);
      return;
    }
    setFormError(null);
      
        const backEndData = cart.map((product) => ({
          product: product._id,
          quantity: product.addcount,
        }));

        const totalPrice = (Array.isArray(cart) ? cart : []).reduce(
          (total, product) => total + product.price * product.addcount,
          0
        );

        try {
          const response = await axios.post(
            "https://onlineshop-sqmq.onrender.com/createOrder",
            {
              productOrderItems: backEndData,
              totalPrice,
              phoneNumber1, 
              phoneNumber2, 
              address,
            },
          );
          alert("Order placed successfully");
          localStorage.setItem("productCart", "[]");
          setCart([]);
        } catch (err: any) {
          alert(err?.response?.data?.message);
        }
      }

      const itemsSum = (Array.isArray(cart) ? cart : []).reduce((total, product) => total + product.price * product.addcount,0)
      const shipping = 3000
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="rounded-2xl"
          variant="outline"
          size="icon"
          onClick={handleOpen}
        >
          <ShoppingCart />
          {cartCount !== 0 && (
            <div className="w-[20px] h-[20px] absolute z-10 rounded-full bg-red-500 ml-7  mb-8">
              {cartCount}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-2xl bg-[#404040] border shadow-black flex flex-col gap-6 
    w-full sm:max-w-md md:max-w-lg lg:max-w-xl
    max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex text-white gap-2">
            <ShoppingCart className="text-sm" />
            <p>Захиалгын мэдээлэл</p>
          </SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="Cart" className="w-full px-6">
          <TabsList>
            <TabsTrigger value="Cart">Сагс</TabsTrigger>
            <TabsTrigger value="Order">Захиалгын мэдээлэл</TabsTrigger>
          </TabsList>
          <TabsContent value="Cart">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Сагс</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 w-full max-w-lg">
                {Array.isArray(cart) && cart.map((product) => {
                  return (
                    <OrderedItem
                      setCart={setCart}
                      description={product.description}
                      key={product._id}
                      productName={product.productName}
                      price={product.price}
                      image={product.image}
                      addcount={product.addcount}
                      _id={product._id}
                      onRemove={() => {
                        setCart((prev) =>
                          prev.filter((item) => item._id !== product._id)
                        );
                      }}
                    />
                  );
                })}
                <div className="grid w-full max-w-md gap-3">
                  <Label htmlFor="address">Хаяг</Label>
                  <Input placeholder="Please share your complete address"
                    id="address"
                    value={address}
                    onChange={handleAddress}/>

                  <Label htmlFor="phoneNumber1">Холбоо барих утас</Label>
                  <Input placeholder="Contact number"
                    id="phoneNumber1"
                    value={phoneNumber1}
                    onChange={handlePhoneNumber1}/>

                  <Label htmlFor="phoneNumber2">Өөр холбоо барих утас</Label>
                  <Input placeholder="Another contact number"
                    id="phoneNumber2"
                    value={phoneNumber2}
                    onChange={handlePhoneNumber2}/>

                  {formError && (
                    <div className="text-red-500 text-sm mb-2">{formError}</div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full max-w-[471px] mt-6">
              <CardHeader>
                <CardTitle>Payment Info</CardTitle>
              </CardHeader>
              <CardContent className="my-5 w-full max-w-[439px]">
                <div className="flex justify-between">
                  <p>Items</p>
                  {itemsSum}₮
                </div>
                <div className="flex justify-between mt-2">
                  <p>Shipping</p>
                  <p>{shipping}₮</p>
                </div>
                <div className="border-b-gray-500 border-dashed my-5"></div>
                <div className="flex justify-between">
                  <p>Total</p>
                  {itemsSum+shipping}₮
                </div>
              </CardContent>
              <CardFooter className="w-full">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleSubmit}
                >
                  Захиалга өгөх
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
