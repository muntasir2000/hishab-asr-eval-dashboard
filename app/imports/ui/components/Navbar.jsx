import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';

const TopNavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="fixed w-full top-0 bg-primary text-white flex items-center gap-8 p-4 shadow-lg z-10">
      <button onClick={toggleSidebar} className="text-xl">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="text-xl"><object type="image/svg+xml" data="https://hishab.co/wp-content/themes/hishab/dist/images/logo.svg"></object></div>
      {/* <div className="text-xl">ASR Dashboard</div> */}
      {sidebarOpen && <Sidebar closeSidebar={toggleSidebar} />}
    </div>
  );
};

export default TopNavBar;
