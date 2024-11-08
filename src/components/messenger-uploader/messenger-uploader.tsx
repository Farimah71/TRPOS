import { Popover } from "antd";
import { IconImage } from "../icons/icons";
import { MessengerUploaderProps } from "./messenger-uploader.types";

export const MessengerFileUploader: React.FC<MessengerUploaderProps> = ({
  id,
  register,
  fileName,
  disabled,
  ...rest
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`relative text-center flex flex-col justify-center items-center gap-1 ${
          !disabled && "cursor-pointer"
        }`}
      >
        {fileName && (
          <Popover content={fileName}>
            <p className="w-2 h-2 rounded-full bg-info absolute right-0 top-0"></p>
          </Popover>
        )}
        <IconImage width={50} color={disabled ? "gray" : "black"} />
      </label>
      <input
        type="file"
        name=""
        id={id}
        className="hidden"
        {...register}
        {...rest}
      />
    </div>
  );
};
