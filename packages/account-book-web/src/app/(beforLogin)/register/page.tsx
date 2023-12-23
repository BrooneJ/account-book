"use client";
import { useGoBack } from "@/app/hooks/useGoBack";
import Header from "@/app/ui/Header";
import HeaderBackButton from "@/app/ui/Header/HeaderBackButton";
import { Input } from "@/app/ui/loginRegister/Input";
import Link from "next/link";
import { Button } from "@/app/ui/loginRegister/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { extractError } from "@/app/lib/error";
import { actions } from "@/app/lib/actions";

const schema = z.object({
  username: z.string().min(4).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

type Schema = z.infer<typeof schema>;

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const onClick = useGoBack();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data: Schema) => {
    startTransition(async () => {
      try {
        const result = await actions("register", data);
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
    <div className="flex flex-col h-full">
      <Header headerLeft={<HeaderBackButton onClick={onClick} />} />
      <div className="text-2xl pl-1 pt-10 font-semibold">
        <span className="font-extrabold text-4xl">登録</span>して
        <br />
        サービスを楽しみましょう！
      </div>
      <form
        className="flex flex-col justify-between flex-grow"
        onSubmit={onSubmit}
      >
        <div className="pt-[50px] h-64 flex flex-col justify-between">
          <div>
            <Input {...register("email")} placeholder="メールアドレス" />
            <div className="h-2">
              {errors.email && (
                <p className="text-sm text-caution">
                  正しいメールアドレスを入力してください。
                </p>
              )}
            </div>
          </div>
          <div>
            <Input {...register("username")} placeholder="ユーザー名" />
            <div className="h-2">
              {errors.username && (
                <p className="text-sm text-caution">
                  ユーザー名は4文字以上20文字以下で入力してください。
                </p>
              )}
            </div>
          </div>
          <div>
            <Input {...register("password")} placeholder="パスワード" />
            <div className="h-2">
              {errors.password && (
                <p className="text-sm text-caution">
                  パスワードは8文字以上20文字以下で入力してください。
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {errors.root?.serverError?.type === "UserExistsError" && (
            <p className="text-caution pb-1">
              既に登録されているメールアドレスです。
            </p>
          )}
          <Button type="submit" layoutMode="fullWidth" disabled={isPending}>
            登録
          </Button>
          <span className="text-[19px] pt-2">
            アカウントをお持ちの方は
            <Link href="/login">
              <span className="text-point font-bold">ログイン</span>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
