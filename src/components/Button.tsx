export default function Button({
  children,
  type = "button",
  ...props
}: React.PropsWithChildren<{
  onClick?: () => void;
  type?: "submit" | "button";
}>) {
  return (
    <button {...props} className="p-8 border border-black hover:bg-sky-500">
      {children}
    </button>
  );
}
