import { Link } from "react-router-dom";

const ProfileSection = ({ userName, userAvatar, userEmail }) => {
  return (
    <div className="flex items-center px-6 space-x-4">
      {/* Profile Image */}
      <img
        src={userAvatar}
        alt="Profile"
        className="w-14 h-14 rounded-full object-cover"
      />

      <div className="ml-4 flex flex-col justify-center">
        {/* Name and email */}
        <div className="max-w-xs">
          <p className="text-sm font-semibold text-gray-800 overflow-wrap break-word">{userName}</p>
          <p className="text-xs text-gray-500 mt-0.5 overflow-wrap break-word">{userEmail}</p>
        </div>
        
        {/* "Xem hồ sơ" link */}
        <Link to="/profile" className="text-sm text-mainColor mt-2 hover:underline">
          Xem hồ sơ
        </Link>
      </div>
    </div>
  );
};

export default ProfileSection;
