interface ButtonProps {
  layoutMode: "modal" | "page";
  mode: "modify" | "delete";
}

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

export default function MutationButton({
  mode,
  layoutMode,
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`rounded-xl ${
        layoutMode === "modal" ? "w-[114px] h-9" : "w-[150px] h-12 text-xl"
      } ${
        mode === "modify"
          ? "border border-point text-point bg-primary bg-opacity-20"
          : "border border-expenseText bg-expenseBg text-expenseText"
      }`}
    >
      {children}
    </button>
  );
}
