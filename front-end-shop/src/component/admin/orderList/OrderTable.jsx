import React from 'react';
import PropTypes from 'prop-types';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa'; // Thêm FaSort

const OrderTable = ({
  currentOrders,
  handleSort,
  sortColumn,
  sortOrder,
  getStatusColor
}) => {
  // Mảng chứa thông tin về các cột trong bảng
  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'NAME', key: 'name' },
    { label: 'ADDRESS', key: 'address' },
    { label: 'DATE', key: 'date' },
    { label: 'TYPE', key: 'type' },
    { label: 'STATUS', key: 'status' }
  ];

  return (
    <div className="overflow-x-auto rounded-[10px]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${column.key === 'date' ? 'cursor-pointer' : ''} ${column.key === 'status' ? 'text-center' : 'text-left'}`} 
                onClick={() => column.key === 'date' && handleSort('date')}
              >
                {column.label}
                {column.key === 'date' && (
                  sortColumn === 'date' ? (
                    sortOrder === 'asc' ? (
                      <FaSortUp className="ms-1.5 inline" />
                    ) : (
                      <FaSortDown className="ms-1.5 inline" />
                    )
                  ) : (
                    <FaSort className="ms-1.5 inline opacity-40" />
                  )
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentOrders.length > 0 ? (
            currentOrders.map(order => (
              <tr key={order.id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.type}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-center ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

OrderTable.propTypes = {
  currentOrders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  })).isRequired,
  handleSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.string,
  sortOrder: PropTypes.oneOf(['asc', 'desc']),
  getStatusColor: PropTypes.func.isRequired
};

export default OrderTable;