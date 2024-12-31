import CommentItem from "./CommentItem";
import CommentReply from "./CommentReply";

const Comment = ({ commentIndex, replyIndex, onReplyClick, onCloseInput, onSendComment }) => {
  const isReplying = replyIndex === commentIndex; // Kiểm tra xem comment có đang được mở input không

  return (
    <div>
      <div>
        {/* Bình luận đầu tiên */}
        <CommentItem isFirst={true} onReplyClick={() => onReplyClick(commentIndex)} />
        {isReplying && (
          <div className="ml-12 mt-4">
            <CommentReply onClose={onCloseInput} onSend={onSendComment} />
          </div>
        )}
      </div>
      <div className="bg-slate-400 ml-12 px-4 py-6 mt-4 space-y-6 rounded-lg">
        {/* Các bình luận còn lại */}
        <CommentItem isFirst={false} />
        <CommentItem isFirst={false} />
      </div>
    </div>
  );
};

export default Comment;
