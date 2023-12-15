import clsx from "clsx";

interface ButtonProps {
  layoutMode?: "fullWidth" | "inline";
  mode?: "register" | "login";
}

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

export function Button({
  mode = "login",
  layoutMode = "fullWidth",
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={clsx("h-[50px] rounded-xl text-white font-bold", {
        "bg-primary": mode === "login",
        "bg-secondary": mode === "register",
        "w-full text-xl": layoutMode === "fullWidth",
        "w-[148px]": layoutMode !== "fullWidth",
      })}
    >
      {children}
    </button>
  );
}
