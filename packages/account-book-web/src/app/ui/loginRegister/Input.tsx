import React from "react";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full h-[48px] rounded-xl border border-gray-3 px-4 focus:border-primary focus:outline-none"
    />
  );
});

export { Input };
