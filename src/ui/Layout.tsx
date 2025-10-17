import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
function Layout() {
  // const { blobRef, mainRef } = useBlob();

  return (
    <>
      <div className="relative flex min-h-screen flex-col to-pink-50 font-sans">
        <Header />
        <main className="relative mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
