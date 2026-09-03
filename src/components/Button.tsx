type ButtonProps = {
  children: any;
  variant?: "primary" | "danger";
  action?: () => void;
};

type ButtonVariants = {
  primary: string;
  danger: string;
};

export function Button({ children, variant = "primary", action }: ButtonProps) {
  const baseStyles =
    "inline-flex flex-row items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all shrink-0";

  const variants: ButtonVariants = {
    primary: "bg-sky-500 hover:bg-sky-400 active:hover:bg-sky-600",
    danger: "bg-red-500 hover:bg-red-400 active:hover:bg-red-600",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={action}>
      {children}
    </button>
  );
}
