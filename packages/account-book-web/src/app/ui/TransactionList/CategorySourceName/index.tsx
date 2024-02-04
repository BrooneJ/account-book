type Props = {
  categoryName: string;
  sourceName: string;
  modal?: boolean;
};

export default function CategorySourceName({
  categoryName,
  sourceName,
  modal,
}: Props) {
  return (
    <div className="flex flex-col ml-3">
      <span className={`${modal ? "text-[16px]" : "text-lg"}`}>
        {sourceName}
      </span>
      <span className={`${modal ? "text-[10px]" : "text-xs"} text-gray-2`}>
        {categoryName}
      </span>
    </div>
  );
}
