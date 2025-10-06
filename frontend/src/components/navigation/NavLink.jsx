import React, { useEffect, useState } from "react";
import {
  Home,
  Search,
  Compass,
  SquareStack,
  Send,
  Heart,
  Plus,
  User,
  Menu,
  LayoutGrid,
} from "lucide-react";
import {
  NavLink as RouterNavLink,
  useLocation,
  useNavigate,
} from "react-router";
import { useDispatch } from "react-redux";
import { logoutUserApi } from "../../features/actions/AuthActions";

const navLinks = [
  { label: "Home", icon: Home, to: "/home" },
  { label: "Search", icon: Search, to: "/search" },
  { label: "explore", icon: Compass, to: "/home/explore" },
  { label: "Reels", icon: SquareStack, to: "/reels" },
  { label: "messages", icon: Send, to: "/home/messages" },
  { label: "Notifications", icon: Heart, to: "/notifications" },
  { label: "Create", icon: Plus, to: "/create" },
  { label: "Profile", icon: User, to: "/profile" },
  { label: "More", icon: Menu, to: "/more" },
];

const NavLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  let logoutUSer = async () => {
    try {
      dispatch(logoutUserApi());
      alert("User logged out");
      navigate("/");
    } catch (error) {
      console.log("Error while logout user api");
    }
  };

  return (
    <div className="bg-black w-56 flex flex-col gap-2">
      {navLinks.map(({ label, icon: Icon, to }, idx) => (
        <RouterNavLink
          key={label}
          to={to}
          className={({ isActive }) =>
            `group flex items-center gap-4 px-4 py-2 rounded-lg transition-all ${
              to === location.pathname
                ? "bg-zinc-800 font-bold text-white"
                : "text-zinc-200 font-medium hover:bg-zinc-800 hover:text-white"
            }`
          }
        >
          <Icon
            size={22}
            strokeWidth={2}
            className={`transition-colors ${
              idx === 0 ? "text-white" : "text-zinc-400 group-hover:text-white"
            }`}
          />
          <span>{label}</span>
          {label === "Notifications" && (
            <span className="ml-1 h-2 w-2 rounded-full bg-pink-500 inline-block" />
          )}
        </RouterNavLink>
      ))}

      <button onClick={logoutUSer} className={"text-white cursor-pointer"}>
        Logout
      </button>
    </div>
  );
};

export default NavLink;
