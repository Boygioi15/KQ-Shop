import { useState } from "react";
import Comment from "./Comment";
import NewComment from "./NewComment";

const CommentSection = () => {
  const [comments, setComments] = useState([]); // Lưu danh sách các bình luận
  const [replyIndex, setReplyIndex] = useState(null); // State để xác định comment nào đang mở input

  const handleReplyClick = (index) => {
    setReplyIndex((prevIndex) => (prevIndex === index ? null : index)); // Đóng nếu click lại
  };

  const handleCloseInput = () => {
    setReplyIndex(null); // Đóng thanh input
  };

  const handleSendCommentReply = (comment) => {
    console.log(`Bình luận mới: ${comment} cho comment ${replyIndex}`);
    setReplyIndex(null); // Đóng thanh input sau khi gửi
  };
  const handleSendNewComment = (comment) => {
    setComments([...comments, { id: comments.length + 1, content: comment }]); // Thêm bình luận mới vào danh sách
  };
  return (
    <div className="space-y-10">
      <div>
        <NewComment onSend={handleSendNewComment} />
      </div>
      <div className="flex flex-col gap-4">
        <Comment
          commentIndex={0}
          replyIndex={replyIndex}
          onReplyClick={handleReplyClick}
          onCloseInput={handleCloseInput}
          onSendComment={handleSendCommentReply}
        />
        <Comment
          commentIndex={1}
          replyIndex={replyIndex}
          onReplyClick={handleReplyClick}
          onCloseInput={handleCloseInput}
          onSendComment={handleSendCommentReply}
        />
      </div>
      <button
        type="button"
        className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded"
      >
        Read all reviews
      </button>
    </div>
  );
};

export default CommentSection;
