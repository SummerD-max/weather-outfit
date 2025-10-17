function ConfirmDelete({ onDelete }: { onDelete: () => void }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Confirm Delete
      </h2>
      <p className="mb-6 text-gray-600">
        Are you sure you want to delete this item?
      </p>
      <div className="flex justify-end">
        <button
          className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
