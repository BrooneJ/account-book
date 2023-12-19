import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-5">
      <Image src="/images/error_404.svg" alt={"404"} width={250} height={250} />
      <span className="text-2xl pt-20 font-semibold">
        お探しのページは
        <br />
        見つかりませんでした。
      </span>
    </div>
  );
}
