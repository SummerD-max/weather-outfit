import { Link, useNavigate } from "react-router";
import Logout from "../features/authentication/Logout";
import Search from "./Search";
import { useEffect, useRef, useState } from "react";
import { BsCloudSun } from "react-icons/bs";

function Header() {
  const navigate = useNavigate();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTop(entry.isIntersecting);
        console.log(entry);
      },
      { threshold: 1.0 },
    );

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="h-0" ref={sentinelRef}></div>
      <header className={`sticky top-0 z-10`}>
        {!isTop && (
          <div
            className="absolute top-5 flex w-20 cursor-pointer items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => {
              navigate("/");
            }}
          >
            <BsCloudSun size={20} />
          </div>
        )}
        <nav
          className={`mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 ${isTop ? "border-transparent bg-transparent" : "border-slate-100 bg-slate-200/60 shadow-lg"} translate-y-2 rounded-full transition-all duration-300`}
        >
          {isTop && (
            <div
              className="flex cursor-pointer items-center gap-3 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => {
                navigate("/");
              }}
            >
              <BsCloudSun size={20} />
              <span>Weather Outfit</span>
            </div>
          )}

          <Search />
          <div className="flex items-center space-x-6 font-semibold">
            <Link
              to="/"
              className="nav-link rounded-sm px-2 py-1 text-lg transition duration-200 hover:text-purple-500"
            >
              Home
            </Link>
            <Link
              to="/wardrobe"
              className="nav-link rounded-sm px-2 py-1 text-lg transition duration-200 hover:text-indigo-600"
            >
              My Wardrobe
            </Link>
            <Link
              to="/settings"
              className="nav-link rounded-sm px-2 py-1 text-lg transition duration-200 hover:text-amber-600"
            >
              Settings
            </Link>

            <Logout />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
