const RatingStat = () => {
  return (
    <div className="flex flex-col mt-4">
      <h3 className="text-xl font-bold text-gray-800">Reviews(10)</h3>
      <div className="space-y-3 mt-3">
        {[
          { score: 5, percent: "66%" },
          { score: 4, percent: "33%" },
          { score: 3, percent: "16%" },
          { score: 2, percent: "8%" },
          { score: 1, percent: "6%" },
        ].map((rating, index) => (
          <div className="flex items-center" key={index}>
            <p className="text-sm text-gray-800 font-bold">{rating.score}.0</p>
            <svg
              className="w-5 fill-blue-600 ml-1"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <div className="bg-gray-400 rounded w-full h-2 ml-3">
              <div
                className={`h-full rounded bg-blue-600`}
                style={{ width: rating.percent }}
              ></div>
            </div>
            <p className="text-sm text-gray-800 font-bold ml-3">
              {rating.percent}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingStat;