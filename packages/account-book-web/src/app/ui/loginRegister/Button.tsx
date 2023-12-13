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
      className={clsx("w-[148px] h-[50px] rounded text-white font-bold", {
        "bg-primary": mode === "login",
        "bg-secondary": mode === "register",
        "w-full": layoutMode === "fullWidth",
      })}
    >
      {children}
    </button>
  );
}
