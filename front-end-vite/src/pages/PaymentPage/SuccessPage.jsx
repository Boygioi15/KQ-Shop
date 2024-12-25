import React, { useEffect, useState } from "react";
import CheckoutMessage from "../../components/CheckoutMessage";

const SuccessPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Thanh toán thành công. Cảm ơn bạn đã sử dụng payOS!");
    }

    if (query.get("canceled")) {
      setMessage(
        "Thanh toán thất bại. Nếu có bất kỳ câu hỏi nào hãy gửi email tới support@payos.vn."
      );
    }
  }, []);

  return <CheckoutMessage message={message} />;
};

export default SuccessPage;
