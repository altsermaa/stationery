"use client";
import { useState } from "react";
import ProductTable from "./_components/ProductTable";
import OrderTable from "./_components/OrderTable";

export default function AdminPage() {
  const [tab, setTab] = useState<'products' | 'orders'>("products");

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${tab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('products')}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('orders')}
        >
          Orders
        </button>
      </div>
      {tab === 'products' ? <ProductTable /> : <OrderTable />}
    </div>
  );
} 