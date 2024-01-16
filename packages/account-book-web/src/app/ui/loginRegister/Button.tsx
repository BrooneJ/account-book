import clsx from "clsx";
import Image from "next/image";

interface ButtonProps {
  layoutMode?: "fullWidth" | "inline";
  mode?: "register" | "login" | "delete";
}

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

export function Button({
  mode = "login",
  layoutMode = "fullWidth",
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={clsx(
        "h-[50px] rounded-xl font-bold flex justify-center items-center",
        {
          "bg-rose-400": mode === "delete",
          "bg-primary": mode === "login",
          "bg-secondary": mode === "register",
          "w-full text-xl": layoutMode === "fullWidth",
          "w-[148px]": layoutMode !== "fullWidth",
          "bg-sub": disabled,
        },
      )}
    >
      {disabled === false ? (
        children
      ) : (
        <Image
          src="/images/loading.svg"
          alt="loading"
          width={24}
          height={24}
          className="animate-spin"
        />
      )}
    </button>
  );
}
