import React, { useState } from 'react';
import { Home, FileText, Users, BarChart2, CreditCard, Briefcase, Grid, Heart, Settings, Menu, X } from 'lucide-react';

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard" },
    { icon: FileText, label: "Transactions" },
    { icon: Users, label: "Accounts" },
    { icon: BarChart2, label: "Investments" },
    { icon: CreditCard, label: "Credit Cards" },
    { icon: Briefcase, label: "Loans" },
    { icon: Grid, label: "Services" },
    { icon: Heart, label: "My Privileges" },
    { icon: Settings, label: "Setting" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-0 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Navigation Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-sm z-40
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-0 lg:w-64'}
      `}>
        <div className={`${!isOpen && 'lg:block hidden'}`}>
          {/* Logo */}
          <div className="px-6 py-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded">
              <img
    src="menu.png" 
    alt="Logo"
    className="h-full w-full object-cover"
  />
              </div>
              <span className="text-xl font-bold text-blue-600">BankDash</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center w-full gap-4 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600 rounded-lg mb-1"
                onClick={() => {
                  // Close menu on mobile when item is clicked
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}