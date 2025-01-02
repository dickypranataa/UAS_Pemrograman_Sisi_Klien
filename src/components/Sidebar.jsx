import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Tambah Data", path: "/add-data" },
  ];

  return (
    <div className="sidebar w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-center text-2xl font-bold">Merapi-App</div>
      <ul className="mt-4">
        {menuItems.map((item, index) => (
          <li key={index} className="py-2 px-4 hover:bg-gray-600">
            <button
              className="w-full text-left"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 w-full bg-red-500 hover:bg-red-600 py-2 px-4 text-left"
        onClick={() => {
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
