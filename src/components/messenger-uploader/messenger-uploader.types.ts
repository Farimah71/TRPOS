import { InputHTMLAttributes } from "react";

export type MessengerUploaderProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  register: any;
  fileName?: string;
};
