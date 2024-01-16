import { Button } from "@/app/ui/loginRegister/Button";
import { UseMutateFunction } from "@tanstack/react-query";
import { useTransition } from "react";
import Image from "next/image";
import { StateType } from "@/app/(afterLogin)/(afterSelect)/[accountId]/@modal/(.)writeTransaction/page";

type Props = {
  title: string;
  mutation: UseMutateFunction<void, Error, void, unknown>;
  data: string[];
  updateState: (newState: Partial<StateType>) => void; // 상태 업데이트 함수
  selected: string[];
  isIncome: string;
  setDelete: (value: boolean) => void;
};

const DeleteCategorySource = ({
  title,
  mutation,
  data,
  selected,
  updateState,
  setDelete,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const toggleItemSelection = (item: string) => {
    if (selected.includes(item)) {
      updateState({ selected: selected.filter((i) => i !== item) });
    } else {
      updateState({ selected: [...selected, item] });
    }
  };

  const handleDelete = () => {
    startTransition(() => {
      mutation();
      setDelete(false);
    });
  };

  return (
    <div className="absolute h-90vh bottom-0 p-5 bg-background w-full rounded-t-xl flex flex-col">
      <div className="flex justify-between pb-2">
        <Image
          src="/images/backArrow.svg"
          alt="backArrow"
          width={30}
          height={30}
          onClick={() => setDelete(false)}
        />
        <span className="text-2xl font-bold pl-2">{title}編集</span>
        <div className="w-[30px] h-[30px]"></div>
      </div>
      <div className="grow overflow-scroll">
        <div className="flex flex-wrap">
          {data.map((item: string) => (
            <div
              tabIndex={0}
              className={`border border-2 ${
                selected.includes(item)
                  ? "border-rose-400 text-rose-400"
                  : "border-gray-1 text-gray-1"
              } rounded-lg p-2 m-1 focus:outline-none`}
              key={item}
              onClick={() => toggleItemSelection(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <Button
        layoutMode="fullWidth"
        mode="delete"
        disabled={isPending}
        onClick={handleDelete}
      >
        削除
      </Button>
    </div>
  );
};

export default DeleteCategorySource;
