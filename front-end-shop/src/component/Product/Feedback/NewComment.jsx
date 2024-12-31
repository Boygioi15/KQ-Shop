import { useState } from "react";

const NewComment = ({ onSend }) => {
  const [newComment, setNewComment] = useState("");

  const handleSend = () => {
    if (newComment.trim()) {
      onSend(newComment); // Gửi nội dung bình luận mới
      setNewComment(""); // Xóa nội dung sau khi gửi
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg  mb-4">
      <h3 className="text-lg font-semibold mb-2">Viết bình luận mới</h3>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-gray-500 text-sm"
        rows="3"
        placeholder="Nhập nội dung bình luận..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        style={{
          resize: "none", // Tắt khả năng kéo dài
        }}
      />
      <button
        onClick={handleSend}
        className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
      >
        Thêm bình luận
      </button>
    </div>
  );
};

export default NewComment;
