import type { ReactNode } from "react";

const polishText = (text: string) =>
  text.replace(/(^|\s)([iIwWaAzZoO])\s+/g, "$1$2\u00a0");

export function PolishText({
  children,
}: {
  children: ReactNode;
}) {
  if (typeof children === "string") {
    return <>{polishText(children)}</>;
  }

  return <>{children}</>;
}