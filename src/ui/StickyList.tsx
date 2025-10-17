function ListToStick() {
  const listItems = Array.from({ length: 20 }, (_, i) => `List Item ${i + 1}`);
  return (
    <div className="sticky top-30 mt-10 h-48 overflow-y-auto rounded-lg border bg-white p-6 shadow-lg">
      <div className="">
        <h3 className="mb-3 text-xl font-semibold">My Sticky List</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          {listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LongContent() {
  return (
    <div className="prose prose-lg max-w-none rounded-lg bg-gray-50 p-8">
      <h1 className="text-4xl font-bold">The Main Content</h1>
      <p>
        This area contains the main content of the page. As you scroll down,
        notice how the list on the right behaves.
      </p>
      {Array.from({ length: 25 }).map((_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Section {i + 1}
          .
        </p>
      ))}
    </div>
  );
}

function StickyList() {
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      <div className="col-span-2">
        <LongContent />
      </div>

      <div className="col-span-1">
        <ListToStick />
      </div>
    </div>
  );
}

export default StickyList;
