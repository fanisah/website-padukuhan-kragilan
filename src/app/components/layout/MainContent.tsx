import type { ReactNode } from "react";

export default function MainContent({
  children,
  offsetHeader = false,
}: {
  children: ReactNode;
  offsetHeader?: boolean;
}) {
  return <main className={offsetHeader ? "pt-[62px]" : undefined}>{children}</main>;
}
