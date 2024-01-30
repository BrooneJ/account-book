import Image from "next/image";
import { useGoBack } from "@/app/hooks/useGoBack";
import { categorySourceStore } from "@/app/store/categorySourceStore";

export default function CloseButton() {
  const goBack = useGoBack();
  const { setCategory, setSource } = categorySourceStore();
  return (
    <div
      className="bg-background rounded-xl"
      onClick={() => {
        goBack();
        setCategory({ type: "expense", name: "未登録" });
        setSource({ type: "expense", name: "未登録" });
      }}
    >
      <Image src="/images/close.svg" alt="close" width={20} height={20} />
    </div>
  );
}
