import type { ForwardedRef } from "react";

type BlobProps = {
  blobref: ForwardedRef<HTMLDivElement>;
};

function Blob({ blobref }: BlobProps) {
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-300 to-blue-300 opacity-30"
      ref={blobref}
    ></div>
  );
}

export default Blob;
