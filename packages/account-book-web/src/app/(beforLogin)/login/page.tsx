"use client";
import Header from "@/app/ui/Header/Header";
import HeaderBackButton from "@/app/ui/Header/HeaderBackButton";
import { useGoBack } from "@/hooks/useGoBack";
import { Input } from "@/app/ui/loginRegister/Input";
import { Button } from "@/app/ui/loginRegister/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "@/app/actions";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export type Schema = z.infer<typeof schema>;

export default function Login() {
  const onClick = useGoBack();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  console.log(watch());

  const onSubmit = handleSubmit(async (data: Schema) => {
    console.log(data);
    await actions(data);
  });

  return (
    <>
      <Header headerLeft={<HeaderBackButton onClick={onClick} />} />
      <div className="text-2xl pl-1 pt-10 font-semibold">
        <span className="font-extrabold text-4xl">ログイン</span>して
        <br />
        サービスを楽しみましょう！
      </div>
      <form onSubmit={onSubmit}>
        <div className="pt-[50px] h-40 flex flex-col justify-between">
          <Input {...register("email")} placeholder="メールアドレス" />
          {errors.email?.message && <p>{errors.email?.message}</p>}
          <Input {...register("password")} placeholder="パスワード" />
          {errors.password?.message && <p>{errors.password?.message}</p>}
        </div>
        <div className="pt-56 flex flex-col items-center">
          <Button type="submit" layoutMode="fullWidth">
            ログイン
          </Button>
          <span className="text-[19px] pt-2">
            アカウントをお持ちではない場合
            <Link href="/register">
              <span className="text-point font-bold">登録</span>
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
