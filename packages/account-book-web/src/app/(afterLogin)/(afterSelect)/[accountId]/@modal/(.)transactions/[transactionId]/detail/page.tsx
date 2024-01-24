"use client";

import { useGoBack } from "@/app/hooks/useGoBack";
import Image from "next/image";

export default function Page({
  params,
}: {
  params: { accountId: string; userId: string };
}) {
  console.log(params);
  const goBack = useGoBack();
  return (
    <div className="absolute h-screen w-full bg-black bg-opacity-40 top-0 left-0 z-10 flex items-center justify-center">
      <div
        className="absolute right-[45px] top-[54px] bg-background rounded-xl"
        onClick={() => {
          goBack();
        }}
      >
        <Image src="/images/close.svg" alt="close" width={20} height={20} />
      </div>
      <div className="p-5 bg-background rounded-xl h-[463px] w-[285px]"></div>
    </div>
  );
}
