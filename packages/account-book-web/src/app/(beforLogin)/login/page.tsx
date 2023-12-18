"use client";
import Header from "@/app/ui/Header/Header";
import HeaderBackButton from "@/app/ui/Header/HeaderBackButton";
import { useGoBack } from "@/app/hooks/useGoBack";
import { Input } from "@/app/ui/loginRegister/Input";
import { Button } from "@/app/ui/loginRegister/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "@/app/lib/actions";
import { useTransition } from "react";
import { extractError } from "@/app/lib/error";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export type Schema = z.infer<typeof schema>;

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const onClick = useGoBack();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data: Schema) => {
    startTransition(async () => {
      try {
        const result = await actions("login", data);
        if (result.error) {
          const error = extractError(result.error);
          if (error.statusCode > 400) {
            setError("root.serverError", {
              type: error.name,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  });

  return (
    <div className="h-full flex flex-col">
      <Header headerLeft={<HeaderBackButton onClick={onClick} />} />
      <div className="text-2xl pl-1 pt-10 font-semibold">
        <span className="font-extrabold text-4xl">ログイン</span>して
        <br />
        サービスを楽しみましょう！
      </div>
      <form
        className="flex flex-col flex-grow justify-between"
        onSubmit={onSubmit}
      >
        <div className="pt-[50px] h-44 flex flex-col justify-between">
          <div>
            <Input {...register("email")} placeholder="メールアドレス" />
            <div className="h-2">
              {errors.email?.message && (
                <p className="text-sm text-caution">
                  正しいメールアドレスを入力してください。
                </p>
              )}
            </div>
          </div>
          <div>
            <Input
              type="password"
              {...register("password")}
              placeholder="パスワード"
            />
            <div className="h-2">
              {errors.password?.message && (
                <p className="text-sm text-caution">
                  パスワードは4文字以上20文字以下で入力してください。
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {errors.root?.serverError?.type === "AuthenticationError" && (
            <p className="text-caution pb-1">
              ユーザー情報が一致していません。
            </p>
          )}
          <Button type="submit" layoutMode="fullWidth" disabled={isPending}>
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
    </div>
  );
}
