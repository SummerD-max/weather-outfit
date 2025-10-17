function Spinner({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
        <p className="font-medium text-gray-600">{children}</p>
      </div>
    </div>
  );
}

export default Spinner;
