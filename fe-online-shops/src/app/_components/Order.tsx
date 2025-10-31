"use client";
import { Button } from "@/components/ui/button";
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
import { OrderedItem } from "./OrderedItem";
import { Product } from "./ShowCards";
import { useRouter } from "next/navigation";
import { OrderHistory } from "./OrderHistory";
import { useUser } from "./UserProvider";


export type ProductOrderItemType = {
  product: Product;
  addcount: number;
};

enum ProductOrderEnum {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

export const Order = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setCart, cartCount } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const handleOpen = () => setIsOpen(true);

  const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        setIsOpen(false);
        router.push("/confirm");
      }

      const itemsSum = (Array.isArray(cart) ? cart : []).reduce((total, product) => total + product.price * product.addcount,0)
      const shipping = 3000
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="rounded-2xl text-white bg-[#c93c70] lg:bg-transparent border-none"
          variant="ghost"
          onClick={handleOpen}
        >
          <ShoppingCart className="text-white bg-[#c93c70] lg:text-[#c93c70] lg:bg-transparent" style={{ width: 24, height: 24 }} strokeWidth={2}/>
          {cartCount !== 0 && (
            <div className="absolute z-10 ml-7 mb-8 text-xs" style={{ color: '#c93c70' }}>
              {cartCount}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-2xl bg-white border shadow-black flex flex-col gap-6 
    w-full sm:max-w-md md:max-w-lg lg:max-w-xl
    max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex text-black gap-2">
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
            {Array.isArray(cart) && cart.length > 0 ? (
              <Card className="w-full max-w-lg">
                <CardHeader>
                  <CardTitle>Сагс</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 w-full max-w-lg">
                  {cart.map((product) => {
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
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full max-w-lg">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <ShoppingCart className="text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500 text-center">There is nothing in your cart</p>
                </CardContent>
              </Card>
            )}
            {Array.isArray(cart) && cart.length > 0 && (
              <Card className="w-full max-w-lg mt-6">
                <CardHeader>
                  <CardTitle>Payment Info</CardTitle>
                </CardHeader>
                <CardContent className="my-5 w-full max-w-lg">
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
                      className="w-full bg-[#c93c70] text-white text-sm"
                      onClick={handleSubmit}
                    >
                    Захиалга өгөх
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="Order">
            {user?._id ? (
              <OrderHistory userId={user._id} />
            ) : (
              <Card className="w-full max-w-lg">
                <CardContent className="flex justify-center py-8">
                  <p className="text-gray-500">Please login to view your orders</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
