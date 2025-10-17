"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { StateChanger } from "./StateChanger";
import { SquareMousePointer } from "lucide-react";

enum orderStatusType {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

export default function OrderTable() {

  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  console.log(orders)
   const [selectedOrdersId, setSelectedOrdersId] = useState<string[]>([]);
  const [orderStatus, setOrderStatus] = useState<orderStatusType>(
    orderStatusType.PENDING
  );

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await axios.get(
        "http://localhost:8000/getAllOrders",
      );
      console.log(response?.data)
      setOrders(response?.data?.orders);
    };
    getAllOrders();
  }, []);

  const selectHandler = (orderId: string) => {
    setSelectedOrdersId(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]              
    );
  };

  const statusHandler = (orderStatus: orderStatusType) => {
    setOrderStatus(orderStatus);
  };

const saveChange = async () => {
    const prepare = selectedOrdersId.map((el) => ({
      _id: el,
      status: orderStatus,
    }));

    await axios.put(
      "http://localhost:8000/updateOrderStatus",
      {
        orders: prepare,
      },
    );

    const updated = orders.map((item) => {
      selectedOrdersId.includes(item._id)
      ? { ...item, status: orderStatus }
      : item
    });
    setOrders(updated);
  };

  // Pagination logic
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <StateChanger saveChange={saveChange} statusHandler={statusHandler} orderStatus={orderStatus}/>
      </div>
      
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2"><SquareMousePointer /></th>
            <th className="p-2">№</th>
            <th className="p-2">Product name</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Total price</th>
            <th className="p-2">Address</th>
            <th className="p-2">Phone 1</th>
            <th className="p-2">Phone 2</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.length === 0 ? (
            <tr><td colSpan={9} className="p-4 text-center">No orders yet.</td></tr>
          ) : (
            paginatedOrders.map((order, orderIdx) =>
              Array.isArray(order?.productOrderItems)
                ? order.productOrderItems.map((item: any, itemIdx: number) => (
                    <tr key={`${order._id}-${itemIdx}`} className="border-t">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectedOrdersId.includes(order._id)}
                          onChange={() => selectHandler(order._id)}
                        />
                      </td>
                      <td className="p-2">{orderIdx + 1}</td>
                      <td className="p-2">{item.product?.productName}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">{order.totalPrice}</td>
                      <td className="p-2">{order.address}</td>
                      <td className="p-2">{order.phoneNumber1}</td>
                      <td className="p-2">{order.phoneNumber2}</td>
                      <td className={
                        order.status === 'PENDING' ? 'p-2 text-yellow-500 font-semibold' :
                        order.status === 'DELIVERED' ? 'p-2 text-green-600 font-semibold' :
                        'p-2 text-black font-semibold'
                      }>
                        {order.status}
                      </td>
                    </tr>
                  ))
                : null
            )
          )}
        </tbody>
      </table>
    
      <div className="flex justify-center items-center mt-15 gap-5">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-gray-200 font-bold' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
} 