
import React, { useState } from 'react';
import Feed from './Feed';
import { Outlet } from 'react-router-dom';
import RightSidebar from './RightSidebar';
import useGetAllPost from '@/hooks/useGetAllPost';
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers';
import { X } from 'lucide-react';
import MobileNavbar from './MobileNavbar';

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen  md:pb-0">
      
      {/* <MobileNavbar /> */}

      {/* Feed Area */}
      <div className="flex-grow mt-1 md:mt-0 ">
        <Feed />
        <Outlet />
      </div>

      {/* Desktop Right Sidebar */}
      <div className="hidden md:block w-[30%]">
        <RightSidebar />
      </div>

      {/* Toggle Suggestions Button (Mobile) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed bottom-20 right-4 bg-gray-200 px-4 py-2 rounded-full shadow z-40"
      >
        Suggestions
      </button>

      {/* Mobile Slide-in Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-[80%] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setIsSidebarOpen(false)}>
                <X />
              </button>
            </div>
            <RightSidebar />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
