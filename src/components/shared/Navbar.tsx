import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { clearUser } from "@/redux/features/auth/authSlice";
import { cn } from "@/lib/utils";

// Import SVG icons from assets
import logoImg from "@/assets/logo.png";
import { LuCodesandbox, LuFileText, LuList, LuSettings, LuStar, LuUser, LuUsers } from "react-icons/lu";
import { ImStatsDots } from "react-icons/im";
const navItems = [
  { label: "Overview", path: "/", icon: <LuCodesandbox className="text-lg" /> },
  { label: "Listings Management", path: "/listings", icon: <LuList className="text-lg" /> },
  { label: "Seller Management", path: "/sellers", icon: <LuUser className="text-lg" /> },
  { label: "Featured & Homepage", path: "/featured", icon: <LuStar className="text-lg" /> },
  { label: "Content Management", path: "/content", icon: <LuFileText className="text-lg" /> },
  { label: "Users & Permissions", path: "/users", icon: <LuUsers className="text-lg" /> },
  { label: "Analytics & Reports", path: "/analytics", icon: <ImStatsDots className="text-lg" /> },
  { label: "Settings", path: "/settings", icon: <LuSettings className="text-lg" /> },
];


const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    window.location.href = "/general-login";
  };

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-[320px] bg-white shadow-sm flex flex-col">
      {/* Logo Section */}
      <div className="p-4 flex items-center gap-3 justify-center">
        <img src={logoImg} className="h-10" alt="Florida Yacht Trader" />
        <span className="text-lg font-bold uppercase text-[#004DAC]">Florida Yacht Trader</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 text-base font-medium",
                    isActive
                      ? "bg-[#0066FF] text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  )
                }
              >
                <span className={`$ {isActive ? "text-[#0066FF]" : "text-black"} `}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#FF3B30] text-white rounded-lg hover:bg-[#E5342A] transition-colors"
        >
          <IoIosLogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;