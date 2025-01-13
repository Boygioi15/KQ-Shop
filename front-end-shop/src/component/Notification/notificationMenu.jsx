import React from 'react';

const NotificationMenu = ({ notifications }) => {
  return (
    <div className="absolute right-0 bg-white shadow-2xl rounded-md w-96 h-72 overflow-y-auto p-4 border-2 border-gray-300">
      <h3 className="font-bold text-lg">Notifications</h3>
      <ul className="mt-2">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className="border-b py-2 hover:bg-slate-100 flex items-start">
              {/* Add image here */}
              <img 
                src="https://giaydabongtot.com/wp-content/uploads/2020/10/Hinh-nen-ronaldo-cr7-may-tinh-laptop-3-scaled.jpg" 
                alt="Notification Avatar" 
                className="w-12 h-12 mr-3"
              />
              <div>
                <p className="text-sm">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No notifications yet.</p>
        )}
      </ul>
    </div>
  );
};

export default NotificationMenu;
