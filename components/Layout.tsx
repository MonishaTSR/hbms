
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { SettingsIcon } from './icons';

const Header: React.FC = () => {
    return (
        <div className="h-20 bg-white flex-shrink-0 flex items-center justify-end px-8 border-b">
            <div className="flex items-center space-x-6">
                <button className="text-gray-500 hover:text-gray-700">
                    <SettingsIcon className="w-6 h-6" />
                </button>
                <div className="flex items-center">
                    <img src="https://i.pravatar.cc/40?u=admin" alt="Admin User" className="w-10 h-10 rounded-full" />
                    <div className="ml-3">
                        <p className="font-semibold text-sm text-gray-800">Admin User</p>
                        <p className="text-xs text-gray-500">Hospital Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-8 lg:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;