import React from "react";
import { Menu, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OverviewNavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Get display name from currentUser object
  const displayName = currentUser?.username || currentUser?.email || "Guest";
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-30">
      {/* Desktop nav */}
      <div className="hidden lg:flex items-center justify-between h-16">
        <h1 className="text-2xl font-bold text-gray-800 px-6">Overview</h1>
        <div className="flex items-center space-x-4 px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="search"
              placeholder="Search for something"
              className="pl-10 w-64 bg-gray-100 focus:bg-white transition-colors h-10"
            />
          </div>
          <div className="relative">
 <img
            src="/setting.png?height=40&width=40"
            alt="Company Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
 </div>
 <div className="relative">
 <img
            src="/bell.png?height=40&width=40"
            alt="Company Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
 </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <Avatar>
                  <AvatarImage 
                    src={currentUser?.profile?.avatar || "/placeholder.svg?height=32&width=32"} 
                    alt={displayName} 
                  />
                  <AvatarFallback>
                    {getInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuLabel className="font-normal text-sm text-gray-500">
                {displayName}
                {currentUser?.role && (
                  <span className="block text-xs text-gray-400">
                    {currentUser.role}
                  </span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="lg:hidden flex flex-col">
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5 text-gray-500" />
            </Button>
            <h1 className="text-lg text-gray-700">Overview</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Avatar>
                  <AvatarImage 
                    src={currentUser?.profile?.avatar || "/placeholder.svg?height=32&width=32"} 
                    alt={displayName}
                  />
                  <AvatarFallback>
                    {getInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuLabel className="font-normal text-sm text-gray-500">
                {displayName}
                {currentUser?.role && (
                  <span className="block text-xs text-gray-400">
                    {currentUser.role}
                  </span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="search"
              placeholder="Search for something"
              className="pl-10 w-full bg-gray-100 focus:bg-white transition-colors h-9 text-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}