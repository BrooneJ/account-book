import Image from "next/image";
import { Button } from "@/app/ui/loginRegister/Button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/751.png"
        alt="person"
        width={350}
        height={350}
        className="pt-5"
      />
      <h1 className="font-bold text-2xl mt-[-40px]">
        ひとりでもグループでも！
        <br /> 管理は簡単！
        <br /> 見やすい、使いやすい
      </h1>
      <div className="pt-[38px] flex flex-col justify-center">
        <div className="flex">
          <Image src="/images/camera.svg" alt="camera" width={24} height={24} />
          <span className="pl-1">レシートはカメラで読み取り</span>
        </div>
        <div className="flex pt-1">
          <Image src="/images/group.svg" alt="group" width={24} height={24} />
          <span className="pl-1">グループで管理可能</span>
        </div>
        <div className="flex pt-1">
          <Image src="/images/graph.svg" alt="graph" width={24} height={24} />
          <span className="pl-1">グラフで見やすく</span>
        </div>
      </div>
      <div className="flex justify-around pt-[30px] w-full">
        <Link href="/login">
          <Button mode="login" layoutMode="inline" disabled={false}>
            ログイン
          </Button>
        </Link>
        <Link href="/register">
          <Button mode="register" layoutMode="inline" disabled={false}>
            登録
          </Button>
        </Link>
      </div>
    </div>
  );
}
