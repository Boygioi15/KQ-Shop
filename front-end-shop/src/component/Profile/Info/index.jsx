import { useSelector } from "react-redux";

const Info = () => {
  const userAvatar = useSelector((state) => state.account.user.avatar);
  const userName = useSelector((state) => state.account.user.name);
  const userEmail = useSelector((state) => state.account.user.email);
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="font-bold text-2xl">Thông tin cá nhân</h3>
      <div className="mb-6 flex flex-col items-center gap-3 rounded-xl bg-white px-4 py-6">
        <div>
          <img
            src={userAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <div className="flex w-96 max-w-full flex-col gap-4 py-2 ">
          <p className="flex justify-between border-b border-solid border-b-[1] pb-3">
            <span>Họ và tên</span>
            <span>{userName}</span>
          </p>
          <p className="flex justify-between border-b border-solid border-b-[1] pb-3">
            <span>Email</span>
            <span>{userEmail}</span>
          </p>
          <p className="flex justify-between border-b border-solid border-b-[1] pb-3">
            <span>Ngày sinh</span>
            <span>N/A</span>
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center text-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 min-w-36"
        >
          Chỉnh sửa hồ sơ
        </button>
      </div>
    </div>
  );
};

export default Info;
