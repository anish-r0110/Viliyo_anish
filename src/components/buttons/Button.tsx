import { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  styles?: string;
}

const Button = ({
  children,
  onClick,
  disabled,
  styles,
  type = "button",
  ...props
}: IButtonProps) => {
  return (
    <button
      className={` btn bg-transparent rounded-full px-10 py-2 outline ${styles} `}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
