import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FaChevronDown } from "react-icons/fa"; // Import Icon từ react-icons

// Các tùy chọn biểu đồ
const options = {
  colors: ["#3C50E0", "#80CAEE", "#F4B400", "#FF4081", "#4CAF50", "#FF5722"],
  chart: {
    type: "bar",
    height: 335,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
      columnWidth: "40%",
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: "12px",
      fontWeight: "bold",
    },
  },
  xaxis: {
    categories: [], // Chỗ này sẽ thay đổi động tùy theo sản phẩm được chọn
  },
  yaxis: {
    title: {
      text: "Stock Quantity",
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
  },
  fill: {
    opacity: 0.9,
  },
};

// Dữ liệu chi tiết của từng loại sản phẩm (danh mục con)
const detailedData = {
  iPhone: {
    categories: ["iPhone 15", "iPhone 16", "iPhone 13", "iPhone 14"],
    data: [120, 100, 90, 150],
  },
  iPad: {
    categories: ["iPad Pro 11", "iPad Pro 12.9", "iPad Air", "iPad Mini"],
    data: [80, 70, 60, 100],
  },
  "Apple Watch": {
    categories: ["Apple Watch Ultra", "Apple Watch 8", "Apple Watch SE"],
    data: [45, 40, 60],
  },
  MacBook: {
    categories: [
      "MacBook Air M1",
      "MacBook Pro 13",
      "MacBook Pro 14",
      "MacBook Pro 16",
    ],
    data: [50, 60, 40, 80],
  },
  AirPods: {
    categories: ["AirPods Pro", "AirPods 3", "AirPods Max"],
    data: [200, 180, 160],
  },
  Accessories: {
    categories: ["MagSafe Charger", "AirTag", "iPhone Case"],
    data: [300, 250, 280],
  },
};

const InventoryChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Stock Quantity",
        data: detailedData.iPhone.data, // Mặc định là dữ liệu iPhone
      },
    ],
    selectedCategory: "iPhone", // Mặc định hiển thị iPhone
    subCategories: detailedData.iPhone.categories, // Danh mục con của iPhone
  });

  // Cập nhật dữ liệu cho biểu đồ khi người dùng chọn một nhóm sản phẩm
  const updateChartData = (category) => {
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Stock Quantity",
          data: detailedData[category].data, // Cập nhật dữ liệu của nhóm sản phẩm đã chọn
        },
      ],
      selectedCategory: category, // Cập nhật category đã chọn
      subCategories: detailedData[category].categories, // Cập nhật danh mục con cho nhóm sản phẩm đó
    }));
  };

  return (
    <div className="col-span-12 rounded-lg border border-gray-200 bg-white p-6 shadow-md xl:col-span-4">
      <div className="mb-4 flex justify-between gap-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">
            Inventory Status by Product Type
          </h4>
        </div>
        <div>
          <div className="relative inline-block">
            <select
              name="#"
              id="#"
              className="bg-transparent py-1 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none appearance-none"
              onChange={(e) => {
                const category = e.target.value;
                updateChartData(category); // Gọi updateChartData khi người dùng chọn category
              }}
            >
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="Apple Watch">Apple Watch</option>
              <option value="MacBook">MacBook</option>
              <option value="AirPods">AirPods</option>
              <option value="Accessories">Accessories</option>
            </select>
            {/* Đặt mũi tên icon ở bên ngoài <select> */}
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
              <FaChevronDown size={14} color="#637381" />
            </span>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={{
              ...options,
              xaxis: {
                categories: state.subCategories, // Cập nhật các danh mục con dựa trên lựa chọn
              },
            }}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryChart;
