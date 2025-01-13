import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { GoReply } from "react-icons/go";
import { useSelector } from "react-redux";

const CommentReply = ({ onClose, onSend }) => {
  const [comment, setComment] = useState("");
  const userAvatar = useSelector((state) => state.account.user.avatar);
  const handleSend = () => {
    if (comment.trim()) {
      onSend(comment); // Gửi nội dung bình luận
      setComment("");
    }
  };

  return (
    <div className="flex items-start bg-gray-100 rounded-lg p-4 shadow-md">
      {/* Giả lập ảnh người dùng */}
      <img
        className="h-8 w-8 rounded-full object-cover"
        src={userAvatar}
        alt="User Avatar"
      />

      {/* Nội dung nhập bình luận */}
      <div className="ml-3 w-full">
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-row gap-2">
            <GoReply className="transform rotate-180" />
            <p className="text-sm text-gray-600 font-semibold">
              <span className="text-gray-400">Đang trả lời:</span> Jonh Doe
            </p>
          </div>
          <IoMdClose
            className="text-gray-600 cursor-pointer"
            size={20}
            onClick={onClose}
          />
        </div>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-gray-500 text-sm"
          rows="3"
          style={{
            resize: "none", // Tắt khả năng kéo dài
          }}
          placeholder="Nhập nội dung trả lời..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="mt-2 px-10 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default CommentReply;
