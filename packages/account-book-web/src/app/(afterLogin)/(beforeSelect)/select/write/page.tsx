"use client";

import { z } from "zod";
import { useTransition } from "react";
import { useGoBack } from "@/app/hooks/useGoBack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount } from "@/app/lib/createAccount";
import Header from "@/app/ui/Header";
import HeaderBackButton from "@/app/ui/Header/HeaderBackButton";
import { Input } from "@/app/ui/loginRegister/Input";
import { Button } from "@/app/ui/loginRegister/Button";
import { useRouter } from "next/navigation";

const schema = z.object({
  type: z.string(),
  name: z.string(),
});

export type Schema = z.infer<typeof schema>;

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const onClick = useGoBack();
  const router = useRouter();
  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data: Schema) => {
    startTransition(async () => {
      try {
        const result = await createAccount(data);
        return result;
      } catch (error) {
        console.log(error);
      }
    });
    router.push("/select");
  });

  return (
    <form className="h-full" onSubmit={onSubmit}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <Header headerLeft={<HeaderBackButton onClick={onClick} />} />
          <span>管理人数</span>
          <div className="pb-12">
            <div className="flex items-center">
              <input
                type="radio"
                id="private"
                value="private"
                className="mr-2 accent-caution h-4 w-4 text-lg"
                {...register("type")}
              />
              <label htmlFor="private">個人</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="group"
                value="group"
                className="mr-2 accent-caution h-4 w-4 text-lg"
                {...register("type")}
              />
              <label htmlFor="group">グループ</label>
            </div>
          </div>
          <span className="pb-4 block">家計簿名</span>
          <Input
            {...register("name")}
            placeholder="１文字以上に書いてください。"
          />
        </div>
        <Button layoutMode="fullWidth" disabled={isPending}>
          登録
        </Button>
      </div>
    </form>
  );
}
