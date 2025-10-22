
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, BedIcon, AmbulanceIcon, SpecialistIcon, StatsIcon, SettingsIcon, SupportIcon, LogoutIcon, HospitalLogoIcon } from './icons';

const navItems = [
  { to: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
  { to: '/wards', icon: <BedIcon />, label: 'Wards' },
  { to: '/ambulances', icon: <AmbulanceIcon />, label: 'Ambulances' },
  { to: '/specialists', icon: <SpecialistIcon />, label: 'Specialists' },
  { to: '/statistics', icon: <StatsIcon />, label: 'Statistics' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white flex flex-col border-r">
      <div className="h-20 flex items-center px-6">
        <div className="flex items-center space-x-2">
            <HospitalLogoIcon className="w-8 h-8 text-blue-500" />
            <span className="text-lg font-bold text-gray-800 tracking-tight">City General Hospital</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {React.cloneElement(item.icon, { className: 'w-5 h-5 mr-3' })}
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-6 border-t">
         <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100">
             <SettingsIcon className="w-5 h-5 mr-3"/>
             Settings
         </a>
         <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100">
             <SupportIcon className="w-5 h-5 mr-3"/>
             Support
         </a>
        <button className="w-full flex items-center mt-4 px-4 py-2.5 text-sm font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 justify-center">
            <LogoutIcon className="w-5 h-5 mr-3"/>
            Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;