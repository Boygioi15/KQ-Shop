import React from "react";

const CheckoutMessage = ({ message }) => (
  <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <p>{message}</p>
      </div>
      <form action="/">
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", color: "#fff", backgroundColor: "#007bff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Quay lại trang thanh toán
        </button>
      </form>
    </div>
  </div>
);

export default CheckoutMessage;
