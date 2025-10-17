import { useState, type FormEvent } from "react";
import type { ClothingItem } from "../../types/WarDrobe";
import { useAddClothing } from "./useAddClothing";

function AddClothingForm() {
  const { addClothing, isPending } = useAddClothing();

  const [name, setName] = useState<ClothingItem["name"]>("");
  const [category, setCategory] = useState<ClothingItem["category"]>("top");
  const [style, setStyle] = useState<ClothingItem["style"]>("casual");

  function handleAddClothing(e: FormEvent) {
    e.preventDefault();
    console.log(e);
    if (!name) return;
    const newClothing: Omit<ClothingItem, "id" | "userId"> = {
      name,
      category,
      style,
      warmth: 5,
    };
    addClothing({ newClothing });
    setName("");
    return;
  }

  return (
    <form
      onSubmit={handleAddClothing}
      className="rounded-xl bg-white p-6 shadow-lg"
    >
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        Add new clothes
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          placeholder="name"
          className="font-future rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as ClothingItem["category"])
          }
        >
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="outerwear">Outerwear</option>
          <option value="accessory">Accessory</option>
        </select>
        <select
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          value={style}
          onChange={(e) => setStyle(e.target.value as ClothingItem["style"])}
        >
          <option value="casual">Casual</option>
          <option value="sporty">Sporty</option>
          <option value="formal">Formal</option>
        </select>
        <button
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-indigo-700 disabled:bg-indigo-300"
          disabled={!name || isPending}
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddClothingForm;
