import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/transactions", label: "Transactions", icon: "💰" },
    { path: "/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <div className="mb-15">
        <h1 className="text-5xl font-bold text-blue-400">FinFlow</h1>
        <p className="text-gray-400 text-xl mt-1">Finance Tracker</p>
      </div>

      <nav className="flex-1 text-xl">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700">
        <div className="px-4 py-2 mb-4 text-xl">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="text-white  font-medium">{user?.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-xl font-bold"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

