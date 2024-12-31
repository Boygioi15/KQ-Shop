import { memo, useState } from "react";
import Header from "../../component/admin/header";
import Sidebar from "../../component/admin/sideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ===== Sidebar Start ===== */}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* ===== Sidebar End ===== */}

      {/* ===== Content Area Start ===== */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* ===== Header Start ===== */}
        <div className="sticky top-0 z-20 bg-white shadow-md">
          <Header setIsSidebarOpen={setIsSidebarOpen} />{" "}
          {/* Pass the setIsSidebarOpen function to Header */}
        </div>
        {/* ===== Header End ===== */}

        {/* ===== Main Content Start ===== */}
        <main className="p-4 md:p-8 2xl:p-10">
          <Outlet />
        </main>
        {/* ===== Main Content End ===== */}
      </div>
      {/* ===== Content Area End ===== */}
    </div>
  );
};

export default memo(AdminLayout);
