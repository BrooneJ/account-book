interface ButtonProps {
  layoutMode: "modal" | "page";
}

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

export default function CancelButton({ layoutMode, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`rounded-xl ${
        layoutMode === "modal" ? "w-[114px] h-9" : "w-[150px] h-12 text-xl"
      } border border-gray-3 bg-gray-0 text-gray-3`}
    >
      {children}
    </button>
  );
}
