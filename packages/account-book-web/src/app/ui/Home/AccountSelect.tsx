import { accountStore } from "@/app/store/accountStore";
import Header from "@/app/ui/Header";
import { Button } from "@/app/ui/loginRegister/Button";
import Link from "next/link";

type AccountData = {
  account: {
    balance: number;
    id: string;
    name: string;
  };
};

export default function AccountSelect({ data }: { data: AccountData[] }) {
  const setAccount = accountStore((state) => state.setAccount);

  return (
    <div className="h-full flex flex-col">
      <Header title="家計簿リスト" />
      <div className="grow">
        {data.map((item: AccountData) => {
          return (
            <div
              className="py-2 text-lg border-b-gray-1 border-b"
              key={item.account.id}
              onClick={() => setAccount(item.account.id)}
            >
              <Link href={`/${item.account.id}`}>{item.account.name}</Link>
            </div>
          );
        })}
      </div>
      <Link href="/select/write">
        <Button
          layoutMode="fullWidth"
          disabled={false}
          className="absolute bottom-0"
        >
          新規作成
        </Button>
      </Link>
    </div>
  );
}
