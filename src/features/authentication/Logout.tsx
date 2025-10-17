import { HiLogout } from "react-icons/hi";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isLoggingOut } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <button
      className="cursor-pointer rounded-full p-2 transition-all hover:bg-gray-200"
      title="退出登录"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <HiLogout />
    </button>
  );
}

export default Logout;
