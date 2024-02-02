const SkeletonForDetail = () => {
  return (
    <div className="flex flex-col p-5 bg-background rounded-xl h-[463px] w-[285px] animate-pulse">
      <div className="flex items-center justify-between py-2 border-b border-b-gray-1">
        <div className="h-6 bg-gray-200 rounded-md w-24"></div>
        <div className="bg-gray-200 rounded-2xl border border-gray-1 w-14 h-7"></div>
      </div>
      <div className="text-right text-gray-2 pt-[10px] pb-[14px]">
        <div className="h-6 bg-gray-200 rounded-md w-32 ml-auto"></div>
      </div>
      <div className="flex flex-col grow">
        <div className="flex border-b border-b-gray-1 pb-2 mb-2">
          <div className="flex flex-col grow">
            <div className="h-4 bg-gray-200 rounded-md w-20 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded-md w-full"></div>
          </div>
          <div className="flex flex-col grow">
            <div className="h-4 bg-gray-200 rounded-md w-20 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded-md w-full"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-4 bg-gray-200 rounded-md w-16 mb-2"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <div className="h-9 bg-gray-200 rounded-md w-[114px]"></div>
        <div className="h-9 bg-gray-200 rounded-md w-[114px]"></div>
      </div>
    </div>
  );
};

export default SkeletonForDetail;
