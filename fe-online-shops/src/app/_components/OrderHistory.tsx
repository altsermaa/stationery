"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

type OrderItem = {
  product: {
    _id: string;
    productName: string;
    price: number;
    image?: string;
  };
  quantity: number;
};

type Order = {
  _id: string;
  totalPrice: number;
  status: "PENDING" | "CANCELLED" | "DELIVERED";
  createdAt: string;
  productOrderItems: OrderItem[];
};

type OrderHistoryProps = {
  userId: string;
};

export const OrderHistory = ({ userId }: OrderHistoryProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `http://localhost:8000/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setOrders(response.data.user.orderedProducts || []);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "DELIVERED":
        return <CheckCircle className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Card className="w-full max-w-lg">
        <CardContent className="flex justify-center py-8">
          <p className="text-gray-500">Loading orders...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-lg">
        <CardContent className="flex justify-center py-8">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="w-full max-w-lg">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Clock className="text-gray-400 mb-4" size={48} />
          <p className="text-gray-500 text-center">No orders found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order._id} className="w-full max-w-lg">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-sm font-medium">
                  Order #{order._id.slice(-6).toUpperCase()}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                {getStatusIcon(order.status)}
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {order.productOrderItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="flex-1">
                    {item.product.productName} × {item.quantity}
                  </span>
                  <span className="text-gray-600">
                    {item.product.price * item.quantity}₮
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-3">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{order.totalPrice}₮</span>
              </div>  
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
