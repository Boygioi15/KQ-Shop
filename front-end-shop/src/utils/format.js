export const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
export const formatNumber = (num) => {
  if (num) {
    // Thêm dấu chấm phân cách hàng nghìn
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

export const parseNumber = (formatted) => {
  // Loại bỏ dấu chấm để lấy số thực
  return parseInt(formatted.replace(/\./g, ""), 10) || 0;
};
