import { useState, useEffect } from "react";
import axios from "axios";
import DigitalEntertainmentForm from "./digitalEntertainmentForm";
import "./App.css";

export default function DigitalEntertainmentList() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/digitalEntertainments"
      );
      setItems(response.data);
    } catch (error) {
      console.error("❌", error);
    }
  }

  const handleSaved = (saved) => {
    const index = items.findIndex((i) => i._id === saved._id);
    if (index >= 0) {
      const updated = [...items];
      updated[index] = saved;
      setItems(updated);
    } else {
      setItems((prev) => [...prev, saved]);
    }
    setItemToEdit(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/digitalEntertainments/${id}`
      );
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (error) {
      console.error("❌", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <DigitalEntertainmentForm
          itemToEdit={itemToEdit}
          onSaved={handleSaved}
        />

        <ul className="mt-8 space-y-4">
          {items.length === 0 && (
            <p className="text-gray-400">
              デジタルエンタテインメントは登録されていません。
            </p>
          )}
          {items.map((item) => (
            <li
              key={item._id}
              className="border border-gray-800 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-300">Start: {item.startDate}</p>
              <p className="text-sm text-gray-300">Finish: {item.endDate}</p>
              <p className="text-sm text-gray-300">Rating: {item.rating}</p>
              <p className="text-sm text-gray-400 italic">"{item.review}"</p>
              <div className="mt-3 space-x-3">
                <button
                  onClick={() => setItemToEdit(item)}
                  className="text-white underline hover:text-gray-300 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 underline hover:text-red-400 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
