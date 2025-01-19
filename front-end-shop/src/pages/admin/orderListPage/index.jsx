import React, { useState } from 'react';
import OrderFilter from '../../../component/admin/orderList/OrderFilter';
import OrderTable from '../../../component/admin/orderList/OrderTable';

const OrderListPage = () => {
  // Sample orders data
  const orders = [
    { id: '00001', name: 'Kiệt Trần', address: 'Trường Đại học Công nghệ Thông Tin - DHQGTPHCM', date: '21/12/2024', type: 'Shirts', status: 'Completed' },
    { id: '00002', name: 'Anh Quyền', address: '123 Xa lộ Hà Nội - TPHCM', date: '1/1/2025', type: 'Tank Tops', status: 'Processing' },
    // Add more orders as needed
  ];

  // State variables
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);

  // Filter orders based on selected filters
  const filteredOrders = orders.filter(order => {
    if (filterDate && order.date !== filterDate) return false;
    if (filterType && order.type !== filterType) return false;
    if (filterStatus && order.status !== filterStatus) return false;
    return true;
  });

  // Sort filtered orders based on selected column and order
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortColumn || !sortOrder) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate sorted orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Function to handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortColumn(null);
        setSortOrder(null);
      } else {
        setSortOrder('asc');
      }
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Function to get background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-100';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      case 'On Hold':
        return 'text-blue-600 bg-blue-100';
      case 'In Transit':
        return 'text-purple-600 bg-purple-100';
      default:
        return '';
    }
  };

  // Get unique filter values
  const uniqueDates = [...new Set(orders.map(order => order.date))].sort();
  const uniqueTypes = [...new Set(orders.map(order => order.type))].sort();
  const uniqueStatuses = [...new Set(orders.map(order => order.status))].sort();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Lists</h2>
      <OrderFilter
        filterDate={filterDate}
        filterType={filterType}
        filterStatus={filterStatus}
        setFilterDate={setFilterDate}
        setFilterType={setFilterType}
        setFilterStatus={setFilterStatus}
        uniqueDates={uniqueDates}
        uniqueTypes={uniqueTypes}
        uniqueStatuses={uniqueStatuses}
      />
      <OrderTable
        currentOrders={currentOrders}
        handleSort={handleSort}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        getStatusColor={getStatusColor}
      />
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, sortedOrders.length)} of {sortedOrders.length} orders
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-l ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= Math.ceil(sortedOrders.length / ordersPerPage)}
            className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-r ${currentPage >= Math.ceil(sortedOrders.length / ordersPerPage) ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderListPage;