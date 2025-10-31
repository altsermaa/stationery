"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "../_components/CartProvider";
import { useUser } from "../_components/UserProvider";

type ProductCartItem = {
  _id: string;
  productName: string;
  price: number;
  image?: string;
  addcount: number;
  description?: string;
};

type UserResponse = {
  success: boolean;
  message: string;
  user: {
    _id: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
};

export default function ConfirmPage() {
  const router = useRouter();
  const { cart, setCart: setContextCart } = useCart();
  const { user, isLoading, isAuthenticated } = useUser();
  
  // Editable user info state
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Initialize editable fields with user data when user is available
    if (user) {
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
    }
  }, [user, isLoading, isAuthenticated, router]);

  const itemsSum = cart.reduce((total, p) => total + p.price * p.addcount, 0);
  const shipping = 3000;

  const updateUserInfo = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token || !user?._id) return;

    try {
      await axios.put(
        `http://localhost:8000/user/${user._id}`,
        {
          email,
          phoneNumber,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User info updated successfully");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to update user info");
    }
  };

  const handleOrderNow = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    const backEndData = cart.map((product) => ({
      product: product._id,
      quantity: product.addcount,
    }));

    const totalPrice = cart.reduce(
      (total, product) => total + product.price * product.addcount,
      0
    );

    try {
      await axios.post(
        "http://localhost:8000/createOrder",
        {
          productOrderItems: backEndData,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order placed successfully");
      setContextCart([]);
      router.push("/");
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Confirm Delivery Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Button 
            onClick={updateUserInfo}
            className="w-full bg-gray-500 text-white text-sm"
          >
            Update Info
          </Button>

          <div className="border-b my-4" />

          <div>
            <p className="font-medium mb-2">Items</p>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>{item.productName} × {item.addcount}</span>
                  <span>{item.price * item.addcount}₮</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b my-4" />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{itemsSum}₮</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping}₮</span>
            </div>
            <div className="flex justify-between font-medium pt-2">
              <span>Total</span>
              <span>{itemsSum + shipping}₮</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-[#c93c70] text-white text-sm"
            onClick={handleOrderNow}
          >
            Order now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


