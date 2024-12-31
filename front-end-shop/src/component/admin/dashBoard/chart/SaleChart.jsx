import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#4379EE', '#80CAEE'], // Màu sắc cho các chuỗi
  chart: {
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#8D8D8D',
      top: 5,
      blur: 8,
      left: 0,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'smooth',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#4379EE',
    strokeColors: ['#4379EE', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    fillOpacity: 1,
    hover: {
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

const SalesChart = ({ seriesDataRevenue, seriesDataSales, seriesNameRevenue, seriesNameSales }) => {
  const [state, setState] = useState({
    series: [
      {
        name: seriesNameRevenue || 'Total Revenue',
        data: seriesDataRevenue || [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },
      {
        name: seriesNameSales || 'Total Sales',
        data: seriesDataSales || [12, 18, 24, 17, 25, 21, 34, 19, 30, 22, 28, 40],
      },
    ],
  });

  const handleReset = () => {
    setState({
      series: [
        {
          name: seriesNameRevenue || 'Total Revenue',
          data: seriesDataRevenue || [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },
        {
          name: seriesNameSales || 'Total Sales',
          data: seriesDataSales || [12, 18, 24, 17, 25, 21, 34, 19, 30, 22, 28, 40],
        },
      ],
    });
  };

  return (
    <div className="rounded-[14px] border border-stroke bg-white px-5 pt-7 pb-5 shadow-default sm:px-7 xl:col-span-8 ">
      {/* Title Section */}
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-[190px]">
            <span className="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary ">
              <span className="block h-4 w-4 rounded-full bg-[#4379EE]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-[190px]">
            <span className="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-4 w-4 rounded-full bg-[#80CAEE]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
