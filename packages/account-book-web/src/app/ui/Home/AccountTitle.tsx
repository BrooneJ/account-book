"use client";

import { useQuery } from "@tanstack/react-query";
import { getAccountBook } from "@/app/lib/getAccountBook";
import Link from "next/link";
import Image from "next/image";
import { AccountBook } from "@/app/model/AccountBook";

export default function AccountTitle({ id }: { id: string }) {
  const { data } = useQuery<AccountBook>({
    queryKey: ["accountbook", id],
    queryFn: () => getAccountBook(id),
  });

  return (
    <div className="flex items-center">
      <span className="text-2xl">{data?.name}</span>
      <Link href="/select">
        <Image
          src="/images/arrowCircle.svg"
          alt="arrowCircle"
          width={20}
          height={20}
          className="ml-2"
        />
      </Link>
    </div>
  );
}
