"use client";

import { useQuery } from "@tanstack/react-query";
import { getAccountBook } from "@/app/lib/getAccountBook";
import Image from "next/image";
import Link from "next/link";

export default function Page({ params }: { params: { accountId: string } }) {
  const id = params.accountId;
  const { data } = useQuery({
    queryKey: ["accountbook", id],
    queryFn: () => getAccountBook(id),
  });

  return (
    <div className="mt-5">
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
    </div>
  );
}
