import { ReactNode } from "react";

export type MyMenuItem = {
  title: string;
  href?: string;
  iconActive?: ReactNode;
  iconDeactive?: ReactNode;
  isParent?: Boolean;
  children?: MyMenuItem[];
};
