"use client";
import Header from "@/app/ui/Header/Header";
import HeaderBackButton from "@/app/ui/Header/HeaderBackButton";
import { useGoBack } from "@/hooks/useGoBack";
import { Input } from "@/app/ui/loginRegister/Input";
import { Button } from "@/app/ui/loginRegister/Button";
import Link from "next/link";

export default function Login() {
  const onClick = useGoBack();
  return (
    <>
      <Header headerLeft={<HeaderBackButton onClick={onClick} />} />
      <div className="text-2xl pl-1 pt-10 font-semibold">
        <span className="font-extrabold text-4xl">ログイン</span>して
        <br />
        サービスを楽しみましょう！
      </div>
      <div className="pt-[50px] h-40 flex flex-col justify-between">
        <Input placeholder="メールアドレス" />
        <Input placeholder="パスワード" />
      </div>
      <div className="pt-56 flex flex-col items-center">
        <span className="text-[19px] pb-2">
          アカウントをお持ちではない場合
          <Link href="/register">
            <span className="text-point font-bold">登録</span>
          </Link>
        </span>
        <Button layoutMode="fullWidth">ログイン</Button>
      </div>
    </>
  );
}
