"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  LayoutDashboard, 
  CalendarDays, 
  History, 
  Users, 
  Settings, 
  Plus, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import { signOut } from "next-auth/react";
import ButtonSchedule from "./ButtonSchedule";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Calendar", icon: CalendarDays },
    { name: "History", icon: History },
    { name: "People", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    signOut({callbackUrl: "/login"})
  }

  return (
    <aside className="fixed left-0 top-0 w-[280px] h-screen bg-[#191f2f] border-r border-[#424754]/50 flex flex-col py-6 z-50">
      <div className="px-6 mb-12">
        <h1 className="text-lg font-bold text-[#adc6ff]">EventFlow</h1>
        <p className="text-xs text-[#c2c6d6] opacity-70 tracking-wider font-medium">Power User</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-2 rounded transition-colors duration-200 ${
                isActive
                  ? "text-[#adc6ff] font-bold border-r-4 border-[#adc6ff] bg-[#4d8eff]/10"
                  : "text-[#c2c6d6] font-medium hover:bg-[#2e3545]/50"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 mt-auto pt-6 space-y-1">
        <ButtonSchedule
          style={"w-full bg-[#adc6ff] text-[#002e6a] py-3 rounded-md font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"}
        >
          <Plus size={18} />
          Schedule Event
        </ButtonSchedule>
        <div className="pt-6 border-t border-[#424754]/30 space-y-1">
          <a className="flex items-center gap-4 px-4 py-2 rounded text-[#c2c6d6] font-medium hover:bg-[#2e3545]/50 transition-colors" href="#">
            <HelpCircle size={20} />
            <span className="text-sm">Help</span>
          </a>
          <a 
            className="flex items-center gap-4 px-4 py-2 rounded text-[#c2c6d6] font-medium hover:bg-[#2e3545]/50 transition-colors" 
            href="#"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="text-sm">Sign Out</span>
          </a>
        </div>
      </div>
    </aside>
  );
}