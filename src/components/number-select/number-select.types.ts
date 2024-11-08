export type NumberSelectProps = {
  options?: { [key: string]: string | number }[];
  placeholder: string;
  isBorderless?: boolean;
  register?: any;
  error?: string;
  touched?: boolean;
};
