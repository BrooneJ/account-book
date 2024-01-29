import Image from "next/image";
import { useGoBack } from "@/app/hooks/useGoBack";

export default function CloseButton() {
  const goBack = useGoBack();
  return (
    <div
      className="bg-background rounded-xl"
      onClick={() => {
        goBack();
      }}
    >
      <Image src="/images/close.svg" alt="close" width={20} height={20} />
    </div>
  );
}
