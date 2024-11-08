import { Select } from "antd";
import { NumberSelectProps } from "./number-select.types";

export const NumberSelectInput = ({
  options,
  placeholder,
  isBorderless,
  register,
}: //   error,
//   touched,
NumberSelectProps) => {
  return (
    <div
      className={`h-[58px] w-20 rounded-2xl pr-2 pl-4 pt-2.5 ${
        isBorderless ? "borderless" : "border"
      }`}
    >
      <Select
        className="number_select"
        options={options}
        placeholder={placeholder}
        style={{ minWidth: 60 }}
        size="small"
        variant="borderless"
        listHeight={150}
        {...register}
      />
    </div>
  );
};
