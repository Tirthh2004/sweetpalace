import { useEffect, useState } from "react";
import { getSweets, deleteSweet, restockSweet } from "@/lib/api"; // ✅ correct path
import SweetCard from "@/components/SweetCard";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);

  const fetchData = async () => {
    const res = await getSweets();
    setSweets(res);
  };

const handleDelete = async (id: string) => {
  try {
    await deleteSweet(id);
    await fetchData();
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete product.");
  }
};

const handleRestock = async (id: string) => {
  const input = prompt("Enter quantity to restock:");
  const amount = input ? parseInt(input, 10) : NaN;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid number");
    return;
  }

  try {
    await restockSweet(id, amount);
    await fetchData();
    console.log(sweets)
  } catch (error) {
    console.error("Restock failed:", error);
    alert("Failed to restock product.");
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet.id}
            sweet={sweet}
            onDelete={handleDelete}
            onRestock={handleRestock}
          />
        ))}
      </div>
    </div>
  );
}
