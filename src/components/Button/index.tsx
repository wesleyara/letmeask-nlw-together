import { ButtonHTMLAttributes } from "react";

import { SButton } from "../../styles/SButton";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <SButton {...props} />;
}
