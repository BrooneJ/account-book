interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: Props) {
  return (
    <input
      {...props}
      className="w-full h-[48px] rounded-xl border border-gray-3 px-4 focus:border-primary focus:outline-none"
    />
  );
}
