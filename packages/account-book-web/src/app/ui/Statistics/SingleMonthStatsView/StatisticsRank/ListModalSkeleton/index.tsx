const ListModalSkeleton = () => {
  return (
    <div className="p-[10px] animate-pulse">
      <div className="flex justify-center">
        <span className="h-6 bg-gray-200 rounded w-1/3"></span>
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="mb-3">
          <div className="border-b border-b-gray-1 py-2 flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6 mr-3"></div>
          </div>
          <div>
            <div className="flex justify-between bg-white h-[46px] rounded-xl items-center my-2 px-3">
              <div className="flex">
                <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
                <div className="ml-3">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListModalSkeleton;
