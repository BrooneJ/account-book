import Header from "@/app/ui/Header";
import Image from "next/image";
import Link from "next/link";

export default function NoneAccountHome() {
  return (
    <>
      <Header title="Home" />
      <div className="flex flex-col items-center">
        <Image
          src={"/images/writePic.png"}
          alt={"writePic"}
          width={400}
          height={400}
        />
        <span className="text-xl m-[-10px] mb-12">
          サービスを利用するには
          <br />
          <span className="text-2xl font-bold">家計簿</span>の追加が必要です！
        </span>
        <Link href="/select/write">
          <div className="flex items-center justify-center rounded-3xl bg-primary w-[150px] h-12 text-white shadow">
            <Image src="/images/plus.svg" alt="plus" width={20} height={20} />
            <span className="text-xl pl-[18px]">追加</span>
          </div>
        </Link>
      </div>
    </>
  );
}
