import { Switch } from "antd";
import { ToggleProps } from "./toggle.types";

export const Toggle: React.FC<ToggleProps> = ({ isChecked, onChangeHandler }) => {
  return <Switch defaultChecked={isChecked} onChange={onChangeHandler} />;
};
