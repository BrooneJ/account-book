"use client";

import Image from "next/image";

interface Props {
  onClick?: () => void;
}
export default function HeaderBackButton({ onClick }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div onClick={onClick}>
        <Image
          src="/images/backArrow.svg"
          alt="backArrow"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}
