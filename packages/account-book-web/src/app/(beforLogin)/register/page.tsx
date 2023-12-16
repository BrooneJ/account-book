"use client";
import { useGoBack } from "@/hooks/useGoBack";
import Header from "@/app/ui/Header/Header";
import HeaderBackButton from "@/app/ui/Header/HeaderBackButton";
import { Input } from "@/app/ui/loginRegister/Input";
import Link from "next/link";
import { Button } from "@/app/ui/loginRegister/Button";

export default function Register() {
  const onClick = useGoBack();
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <Header headerLeft={<HeaderBackButton onClick={onClick} />} />
        <div className="text-2xl pl-1 pt-10 font-semibold">
          <span className="font-extrabold text-4xl">登録</span>して
          <br />
          サービスを楽しみましょう！
        </div>
        <div className="pt-[50px] h-56 flex flex-col justify-between">
          <Input placeholder="メールアドレス" />
          <Input placeholder="ユーザー名" />
          <Input placeholder="パスワード" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[19px] pb-2">
          アカウントをお持ちの方は
          <Link href="/login">
            <span className="text-point font-bold">ログイン</span>
          </Link>
        </span>
        <Button layoutMode="fullWidth">登録</Button>
      </div>
    </div>
  );
}
