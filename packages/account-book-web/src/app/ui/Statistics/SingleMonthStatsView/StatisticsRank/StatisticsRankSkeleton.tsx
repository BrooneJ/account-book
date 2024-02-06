const StatisticsRankSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-0 px-3 py-2 mb-[10px] rounded-xl animate-pulse"
        >
          <div className="flex items-center">
            <div className="h-7 w-7 rounded-2xl mr-4 shadow-md border border-gray-0 bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="h-4 bg-gray-200 rounded-md w-3/4 mb-2"></span>
              <span className="h-3 bg-gray-200 rounded-md w-1/2"></span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="h-3 bg-gray-200 rounded-md w-10 mr-2"></span>
            <div className="h-6 w-16 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default StatisticsRankSkeleton;
