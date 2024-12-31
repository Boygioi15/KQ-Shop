import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../component/Profile/SideBar";

const ProfilePage = () => {
  return (
    <div>
      <div className="flex overflow-hidden mt-6">
        {/* ===== Sidebar Start ===== */}
        <div className="w-64 text-white h-fit z-10 sticky top-0">
          <Sidebar />
        </div>
        {/* ===== Sidebar End ===== */}

        {/* ===== Content Area Start ===== */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* ===== Main Content Start ===== */}
          <main className="px-4 md:px-6 2xl:px-10">
            <Outlet />
          </main>
          {/* ===== Main Content End ===== */}
        </div>
        {/* ===== Content Area End ===== */}
      </div>
      {/* <div className="mt-4">
        <ProductSection/>
      </div> */}
    </div>
  );
};

export default ProfilePage;
