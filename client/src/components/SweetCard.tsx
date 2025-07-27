import { Button } from "@/components/ui/button";

export default function SweetCard({ sweet, onDelete, onRestock }) {
  return (
    <div className="border p-4 rounded-xl shadow-lg">
      <img src={sweet.image_url} className="w-full h-48 object-cover mb-2" />
      <h2 className="text-xl font-bold">{sweet.name}</h2>
      <p>Price: ₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>

      <div className="flex gap-2 mt-3">
        <Button variant="destructive" onClick={() => onDelete(sweet.id)}>
          Delete
        </Button>
        <Button onClick={() => onRestock(sweet.id)}>
          Restock
        </Button>
      </div>
    </div>
  );
}
