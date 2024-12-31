import { memo } from "react";
import Header from "../../component/theme/header";
import Footer from "../../component/theme/footer";
import Breadcrumb from "../../component/Breadcrumb"; // Import Breadcrumb component
import { Outlet, useLocation } from "react-router-dom";

const MasterLayout = ({ breadcrumbItems = [], ...props }) => {
  const location = useLocation();

  // Nếu không truyền breadcrumbItems từ trang con, ta có thể tự động tạo breadcrumb dựa trên location.pathname
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x); // Tách đường dẫn thành mảng
    const breadcrumbs = pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      return {
        name: value.charAt(0).toUpperCase() + value.slice(1), // Capitalize first letter
        link: to,
      };
    });
    return [{ name: 'Home', link: '/' }, ...breadcrumbs]; // Thêm "Home" vào đầu breadcrumb
  };

  const breadcrumbData = breadcrumbItems.length ? breadcrumbItems : generateBreadcrumbs();

  return (
    <>
      <div
        className="flex flex-col min-h-screen mx-4 sm:mx-6 md:mx-12 lg:mx-28" // Điều chỉnh margin cho các màn hình khác nhau
        {...props}
      >
        <Header />

        {/* Hiển thị breadcrumb nếu có dữ liệu */}
        {breadcrumbData.length > 1 && (
          <div className="py-4"> {/* Thêm margin top/bottom cho breadcrumb */}
            <Breadcrumb breadcrumbItems={breadcrumbData} />
          </div>
        )}

        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <div className="mt-8"> {/* Điều chỉnh khoảng cách với footer */}
        <Footer />
      </div>
    </>
  );
};

export default memo(MasterLayout);
