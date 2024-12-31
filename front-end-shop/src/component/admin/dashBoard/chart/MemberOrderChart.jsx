import ReactApexChart from 'react-apexcharts';

const MemberOrderChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Member', 'Non-Member'],
    colors: ['#3C50E0', '#8033ff'],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div className="w-full p-6 rounded-lg border border-gray-200 bg-white shadow-md">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">Customer Orders: Member vs Non-Member</h4>
      <ReactApexChart
        options={chartOptions}
        series={data.series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default MemberOrderChart;
