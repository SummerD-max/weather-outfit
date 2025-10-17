import type { ClothingItem } from "../../types/WarDrobe";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "top":
      return "👕";
    case "bottom":
      return "👖";
    case "outerwear":
      return "🧥";
    case "accessory":
      return "🧣";
    default:
      return "👚";
  }
};

function ClothingCard({ item }: { item: ClothingItem }) {
  return (
    <div className="flex items-center space-x-3 rounded-lg bg-gray-100 p-3">
      <span className="text-2xl">{getCategoryIcon(item.category)}</span>
      <div>
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-500">
          {item.style} / warmth: {item.warmth}
        </p>
      </div>
    </div>
  );
}

export default ClothingCard;
