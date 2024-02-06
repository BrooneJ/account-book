const BarChartSkeleton = () => {
  return (
    <div className="animate-pulse h-full">
      <div className="flex justify-center items-center flex-col h-full">
        {/* top label */}
        <div className="h-6 w-full"></div>
        {/* chart */}
        <div className="w-full mb-5">
          <div className="flex justify-between h-[360px]">
            {/* left label */}
            <div className="flex flex-col justify-between">
              <div className="w-12 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-12 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-12 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-12 h-4 bg-gray-300 rounded"></div>
            </div>
            {/* bar container */}
            <div className="flex-grow mx-2">
              <div className="grid grid-cols-6 gap-4 w-full h-full">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex flex-col justify-end">
                    {Array.from({ length: 4 }).map((_, barIndex) => (
                      <div
                        key={barIndex}
                        className="h-1/4 w-full bg-gray-300 rounded mb-1"
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* bottom label */}
        <div className="flex justify-between w-full mt-2">
          <div className="w-6 h-4 bg-gray-300 rounded"></div>
          <div className="w-6 h-4 bg-gray-300 rounded"></div>
          <div className="w-6 h-4 bg-gray-300 rounded"></div>
          <div className="w-6 h-4 bg-gray-300 rounded"></div>
          <div className="w-6 h-4 bg-gray-300 rounded"></div>
          <div className="w-6 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default BarChartSkeleton;
