function Toc() {
  // 将 sticky 规则应用到这个 div 上
  return (
    <div className="sticky top-0">
      <h2 className="font-bold">Table of Contents</h2>
      <ul className="list-disc pl-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>Item {index + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default Toc;
