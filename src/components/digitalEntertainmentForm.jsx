import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function DigitalEntertainmentForm({ itemToEdit, onSaved }) {
  const [item, setItem] = useState({
    title: "",
    startDate: "",
    endDate: "",
    rating: "",
    review: "",
  });

  useEffect(() => {
    if (itemToEdit) {
      setItem(itemToEdit);
    } else {
      setItem({
        title: "",
        startDate: "",
        endDate: "",
        rating: "",
        review: "",
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (itemToEdit && itemToEdit._id) {
        response = await axios.put(
          `http://localhost:3000/api/digitalEntertainments/${itemToEdit._id}`,
          item
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/api/digitalEntertainments",
          item
        );
      }
      onSaved(response.data);
      setItem({
        title: "",
        startDate: "",
        endDate: "",
        rating: "",
        review: "",
      });
    } catch (error) {
      console.error("❌", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black text-white rounded-2xl p-6 border border-gray-800 mb-8"
    >
      <h2 className="text-xl font-semibold mb-6">
        {itemToEdit ? "Edit" : ""} デジタルエンタテインメント
      </h2>

      <div className="mb-4">
        <label className="block text-sm mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={item.title}
          onChange={handleChange}
          required
          className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={item.startDate}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Finish Date</label>
          <input
            type="date"
            name="endDate"
            value={item.endDate}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Rating (0–10)</label>
        <input
          type="number"
          name="rating"
          value={item.rating}
          onChange={handleChange}
          min="0"
          max="10"
          className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-1">Rating Description</label>
        <textarea
          name="review"
          value={item.review}
          onChange={handleChange}
          rows="4"
          className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      <button
        type="submit"
        className=" cursor-pointer w-full bg-black text-white border border-white py-2 rounded hover:bg-white hover:text-black transition"
      >
        Save
      </button>
    </form>
  );
}
