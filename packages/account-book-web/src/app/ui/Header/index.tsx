interface Props {
  headerLeft?: React.ReactNode;
  title?: string;
}

export default function Header({ headerLeft, title }: Props) {
  return (
    <div className="h-[64px] flex items-center">
      {headerLeft && (
        <div className="flex justify-between items-center">{headerLeft}</div>
      )}
      <div className="flex-1 flex justify-center items-center">
        <div className="text-lg font-bold">{title}</div>
      </div>
      {headerLeft && <div className="w-[24px]" />}
    </div>
  );
}
