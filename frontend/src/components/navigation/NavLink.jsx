import React from "react";
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
import { NavLink as RouterNavLink } from "react-router";

const navLinks = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Search", icon: Search, to: "/search" },
  { label: "explore", icon: Compass, to: "/explore" },
  { label: "Reels", icon: SquareStack, to: "/reels" },
  { label: "messages", icon: Send, to: "/messages" },
  { label: "Notifications", icon: Heart, to: "/notifications" },
  { label: "Create", icon: Plus, to: "/create" },
  { label: "Profile", icon: User, to: "/profile" },
  { label: "More", icon: Menu, to: "/more" },
  { label: "Also from Meta", icon: LayoutGrid, to: "/meta" },
];

const NavLink = () => {
  return (
    <div className="bg-black py-4 w-56 flex flex-col gap-2">
      {navLinks.map(({ label, icon: Icon, to }, idx) => (
        <RouterNavLink
          key={label}
          to={to}
          className={({ isActive }) =>
            `group flex items-center gap-4 px-4 py-2 rounded-lg transition-all ${
              isActive
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
    </div>
  );
};

export default NavLink;
