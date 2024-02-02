"use client";

import { useState } from "react";
import Detail from "@/app/ui/ModalContents/Transaction/Detail";
import Edit from "@/app/ui/ModalContents/Transaction/Edit";
import CloseButton from "@/app/ui/Common/CloseButton";

export default function Page({
  params,
}: {
  params: { accountId: string; transactionId: string };
}) {
  const { accountId, transactionId } = params;
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="absolute h-screen w-full bg-black bg-opacity-40 top-0 left-0 z-10 flex items-center justify-center">
      <div className="absolute right-[45px] top-[54px] ">
        <CloseButton />
      </div>
      {isEdit ? (
        <Edit
          setIsEdit={setIsEdit}
          accountId={accountId}
          transactionId={transactionId}
        />
      ) : (
        <Detail
          setIsEdit={setIsEdit}
          accountId={accountId}
          transactionId={transactionId}
        />
      )}
    </div>
  );
}
