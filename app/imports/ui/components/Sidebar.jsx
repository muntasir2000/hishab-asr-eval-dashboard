import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../lib';

const Sidebar = ({ closeSidebar }) => {
  const {logout, user} = useAuth();
  const handleLogout = () => {
    logout();
  }
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg z-20">
      <div className="p-4 flex justify-end">
        <button onClick={closeSidebar} className="text-xl">&times;</button>
      </div>
      <nav className="p-4">
        <ul>
          {user && (
            <li className="mb-4">
            <a className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {user.profile?.name}
            </a>
          </li>
          )}
          
        </ul>
      </nav>
      <div className="absolute bottom-4 left-4">
        <button className="flex items-center text-white" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
