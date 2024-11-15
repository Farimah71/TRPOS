import BaseIcon from "../base-icon";
import { SvgIconProps } from "../icon.types";

export default function SvgIcon(props:SvgIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M21 15.5944C21 18.3596 19.1552 20.6072 16.4183 20.6004H7.58173C4.84476 20.6072 3 18.3596 3 15.5944V9.41315C3 6.65088 4.84476 4.40039 7.58173 4.40039H16.4183C19.1552 4.40039 21 6.65088 21 9.41315V15.5944Z"/><path d="M20.5864 7.37988L14.1172 12.6402C12.8989 13.6082 11.1722 13.6082 9.95397 12.6402L3.42969 7.37988"/>
    </BaseIcon>
  );
}