import ReactApexChart from "react-apexcharts";

const PaymentMethodChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Credit Card", "E-Wallet", "COD"],
    colors: ["#3C50E0", "#da5436", "#e59230"],
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="w-full p-6 rounded-lg border border-gray-200 bg-white shadow-md">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">
        Payment Method Distribution
      </h4>
      <ReactApexChart
        options={chartOptions}
        series={data.series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default PaymentMethodChart;
