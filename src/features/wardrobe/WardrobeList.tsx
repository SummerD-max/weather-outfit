import type { ClothingItem } from "../../types/WarDrobe";
import { useWardrobe } from "./useWardrobe";
import { useRemoveClothing } from "./useRemoveClothing";
import SpinnerInside from "../../ui/SpinnerInside";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

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

function WardrobeList() {
  const { wardrobe, isLoading, error } = useWardrobe();
  const { removeClothing, isRemoving } = useRemoveClothing();

  function handleRemoveClothing(id: ClothingItem["id"]) {
    removeClothing(id);
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        My wardrobe ({wardrobe?.length})
      </h2>
      {isLoading && <SpinnerInside />}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wardrobe?.map((item) => (
          <Modal key={item.id}>
            <div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-2 flex items-center">
                  <span className="mr-3 text-2xl">
                    {getCategoryIcon(item.category)}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.category[0].toUpperCase() + item.category.slice(1)}{" "}
                      · {item.style[0].toUpperCase() + item.style.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Warmth: {item.warmth}/10
                  </span>
                  <Modal.ModalOpener id={`delete-${item.id}`}>
                    <button
                      className="cursor-pointer text-sm text-red-500 hover:text-red-700 disabled:text-gray-400"
                      disabled={isRemoving}
                    >
                      Delete
                    </button>
                  </Modal.ModalOpener>
                </div>
              </div>
            </div>
            <Modal.ModalContent id={`delete-${item.id}`}>
              <ConfirmDelete onDelete={() => handleRemoveClothing(item.id)} />
            </Modal.ModalContent>
          </Modal>
        ))}
      </div>
    </div>
  );
}

export default WardrobeList;
