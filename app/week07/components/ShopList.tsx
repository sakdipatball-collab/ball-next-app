"use client";

import { useState } from "react";
import Link from "next/link";
import { handler } from "next/dist/build/templates/app-route";
import { useRouter } from "next/navigation";

export default function ShopList({ data }){

    // alert(data);

    const [keyword, setKeyword] = useState("");

    const filterShops = data.filter(
        (item) => {
            const searchText = keyword.toLowerCase();
            return item.shopName.toLowerCase().includes(searchText)
        }
    );

    const Status = (sta) => {
    if (sta) {
        return <span className="text-green-600 font-semibold">TRUE</span>;
    } else {
        return <span className="text-red-600 font-semibold">FALSE</span>;
    }
};

  // เพิ่มคำสั่งภายใน component ShopList ส่วนของ Script
  const router = useRouter();

const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shop?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
  `http://localhost:2547/api/shops/${id}`,
  {
    method: "DELETE",
  }
      );

      if (!response.ok) {
        throw new Error("Failed to delete Shop");
      }
      // Refresh page
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
};

    return(
        <div className="max-w-3xl ma-auto p-6">

            {/* Search */}
        <div className="mb-6">

        <input
          type="text"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="Search shop..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        </div>

        <div className="mb-4 text-gray-600">Found {data.length} shop(s)</div>

        <div className="flex justify-between items-center">
        <Link href="/week07/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg">
            + Add New
        </Link>
        </div>

        <br />

            <div className="space-y-4">
            {
                filterShops.map(shop => (
                    <div key={shop.shopId} className="border rounded-lg p-4">
                        <h2 className="font-semibold">
                            {shop.shopName}
                        </h2>
                        <p>Open Status: {Status(shop.shopStatus)}</p>

                        <Link
                            href={`/week07/${shop.id}`}
                            className="ms-1 bg-blue-600 text-white px-3 py-2 rounded">
                        View Detail
                        </Link>

                        <Link href={`/week07/${shop.id}/edit`}
                            className="ms-1 bg-yellow-400 text-black px-3 py-2 rounded">
                            Update
                        </Link>

                        <button onClick={(e)=>handleDelete(`${shop.id}`)}
                            className="ms-1 bg-red-500 text-white px-3 py-2 rounded">
                            Delete
                        </button>
                    </div>
                ))
            }
            </div>

        </div>
    );

}