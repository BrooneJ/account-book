interface Props {
  headerLeft?: React.ReactNode;
}

export default function Header({ headerLeft }: Props) {
  return (
    <div className="h-[64px] flex items-center">
      {headerLeft && (
        <div className="flex justify-between items-center">{headerLeft}</div>
      )}
    </div>
  );
}
