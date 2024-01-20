"use client";

import HeaderBackButton from "@/app/ui/Header/HeaderBackButton";
import { useGoBack } from "@/app/hooks/useGoBack";

interface Props {
  headerLeft?: boolean;
  title?: string;
}

export default function LowHeader({ headerLeft, title }: Props) {
  const onClick = useGoBack();
  return (
    <div className="py-3 flex items-center">
      {headerLeft && (
        <div className="flex justify-between items-center">
          {<HeaderBackButton onClick={onClick} />}
        </div>
      )}
      <div className="flex-1 flex justify-center items-center">
        <div className="text-xl font-bold">{title}</div>
      </div>
      {headerLeft && <div className="w-[24px]" />}
    </div>
  );
}
