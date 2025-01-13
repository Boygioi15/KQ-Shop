const DashboardCard = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-8">
      <div className="flex items-center justify-between space-x-4">
        {/* Title and Total */}
        <div className="flex flex-col justify-center items-start space-y-1 min-w-0">
          <span className="text-sm flex flex-wrap font-medium text-gray-600 max-w-24">{title}</span>
          <h4 className="text-xl font-semibold text-black truncate">{total}</h4>
        </div>
        
        {/* Children Icon */}
        <div className="flex items-center justify-center rounded-full h-16 w-16">
          {children}
        </div>
      </div>

      {/* Rate Section */}
      <div className="mt-2 flex items-center justify-between">
        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp ? "text-green-500" : ""
          } ${levelDown ? "text-red-500" : ""}`}
        >
          {rate}

          {/* Up Icon and Text */}
          {levelUp && (
            <>
              <span className="text-green-500">Up from past week</span>
              <svg
                className="fill-current text-green-500"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" />
              </svg>
            </>
          )}

          {/* Down Icon and Text */}
          {levelDown && (
            <>
              <span className="text-red-500">Down from past week</span>
              <svg
                className="fill-current text-red-500"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z" />
              </svg>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
