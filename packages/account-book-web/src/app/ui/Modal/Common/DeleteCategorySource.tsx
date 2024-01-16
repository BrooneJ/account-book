import { Button } from "@/app/ui/loginRegister/Button";
import { UseMutateFunction } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  mutation: UseMutateFunction<void, Error, void, unknown>;
  data: string[];
  setDelete: (value: boolean) => void;
  setSelected: Dispatch<SetStateAction<string[]>>;
  selected: string[];
  isIncome: string;
};

const DeleteCategorySource = ({
  title,
  mutation,
  data,
  setDelete,
  selected,
  setSelected,
}: Props) => {
  const toggleItemSelection = (item: string) => {
    setSelected((prev) => {
      const isAlreadySelected = prev.includes(item);
      if (isAlreadySelected) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  console.log(selected);

  return (
    <div className="absolute h-90vh bottom-0 p-5 bg-background w-full rounded-t-xl flex flex-col">
      <span className="text-2xl font-bold pb-2">{title} 編集</span>
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
        disabled={false}
        onClick={() => {
          mutation();
          setDelete(false);
        }}
      >
        削除
      </Button>
    </div>
  );
};

export default DeleteCategorySource;
