import { AiFillLike, AiFillStar } from "react-icons/ai";
import { GoReply } from "react-icons/go";

const CommentItem = ({ isFirst, onReplyClick }) => {
  return (
    <div className="flex items-start">
      <img
        src="https://readymadeui.com/team-2.webp"
        className="w-12 h-12 rounded-full border-2 border-white"
        alt="Reviewer"
      />
      <div className="ml-3">
        <h4 className="text-sm font-bold text-gray-800">John Doe</h4>
        <div className="flex space-x-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <AiFillStar
              key={i}
              className={`w-4 h-4 ${i < 3 ? "text-blue-600" : "text-[#CED5D8]"}`}
            />
          ))}
          <p className="text-xs !ml-2 font-semibold text-gray-800">
            2 mins ago
          </p>
        </div>
        <p className="text-sm mt-4 text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex space-x-4 mt-2">
          <button className="flex flex-row justify-center items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600 border-2 rounded-full border-[#d1d5db]">
            <AiFillLike />0
          </button>
          {isFirst && (
            <button
              onClick={onReplyClick}
              className="flex flex-row justify-center items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600 border-2 rounded-full border-[#d1d5db]"
            >
              <GoReply />Trả lời
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
