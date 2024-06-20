type LinkProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"a">;

export function Link({ children, ...props }: LinkProps) {
  return <a {...props}>{children}</a>;
}
