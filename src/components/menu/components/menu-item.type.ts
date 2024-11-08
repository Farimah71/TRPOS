import { MyMenuItem } from "../../../types/menu-item.type";

export type MenuItemProps = MyMenuItem & {
  isActive?: boolean;
  isToggled?: boolean;
};
