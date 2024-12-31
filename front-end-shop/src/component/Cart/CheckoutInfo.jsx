import React, { useState } from "react";

const CheckoutInfo = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Gửi dữ liệu form lên cho cha
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h2 className="text-lg font-bold mb-4">Thông Tin Thanh Toán</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Họ và Tên
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Địa Chỉ
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Số Điện Thoại
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ghi Chú
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            style={{
              resize: "none", // Tắt khả năng kéo dài
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all"
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutInfo;
