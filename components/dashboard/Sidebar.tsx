"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  User,
  BarChart3,
  Flame,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isMobile: boolean;
}

interface UserData {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  role: string;
  avatar?: string;
}

export default function Sidebar({ isOpen, setIsOpen, isMobile }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/dashboard/blog", label: "Blog ", icon: FileText },
    { path: "/dashboard/projects ", label: "Projects", icon: BookOpen },
    { path: "/dashboard/streak", label: "Streak", icon: Flame },
  ];

  const handleLogout = () => {
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20"
        >
          <Menu className="h-5 w-5 text-white" />
        </button>
      )}

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative z-50 h-full transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0 md:w-20"
        } ${!isOpen && isMobile ? "hidden" : "block"}`}
      >
        <div className="h-full backdrop-blur-xl bg-black/50 border-r border-white/10 flex flex-col">
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-2 ${
                  !isOpen && !isMobile ? "justify-center w-full" : ""
                }`}
              ></div>
              {!isMobile && (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isOpen ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {user && (isOpen || isMobile) && (
            <div className="p-4 mx-3 mt-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{user.name}</p>
                  <p className="text-gray-400 text-xs truncate">
                    {user.email || user.mobile}
                  </p>
                </div>
              </div>
            </div>
          )}

          <nav className="flex-1 py-4">
            <div className="px-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {(isOpen || isMobile) && (
                      <span className="text-sm">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="p-3 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-all duration-200 text-red-400 hover:text-red-300"
            >
              <LogOut className="h-4 w-4" />
              {(isOpen || isMobile) && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
