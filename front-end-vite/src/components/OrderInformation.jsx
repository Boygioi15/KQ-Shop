import React from "react";

const OrderInformation = () => (
  <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Tên sản phẩm:</strong> Mì tôm Hảo Hảo ly</p>
        <p><strong>Giá tiền:</strong> 2000 VNĐ</p>
        <p><strong>Số lượng:</strong> 1</p>
      </div>
      <form action="/api/payment/create-payment-link" method="post">
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", color: "#fff", backgroundColor: "#007bff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Tạo Link thanh toán
        </button>
      </form>
    </div>
  </div>
);

export default OrderInformation;
