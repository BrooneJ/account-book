import Image from "next/image";

export default function Spinner() {
  return (
    <Image
      src="/images/loading.svg"
      alt="loading"
      width={24}
      height={24}
      className="animate-spin"
    />
  );
}
