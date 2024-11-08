import { api } from "../api";
import { MenuProps } from "antd/es/menu";
import { MdLogout } from "react-icons/md";
import { TbActivity } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";
import { createData } from "../core/http-service";
import { setSignoutLoading } from "../redux/reducers/auth/signout";
import { AppDispatch } from "../redux/store/store";
import { Link } from "react-router-dom";
import { rechangeToken } from "../redux/actions/auth/rechange-token";

export const ProfileMenuItems = (dispatch: AppDispatch, navigate: any) => {
  const items: MenuProps["items"] = [
    {
      label: (
        <Link to={"#"} className="text-base py-1">
          Bildirimler
        </Link>
      ),
      icon: <RiNotification2Line size={18} />,
      key: "0",
    },
    {
      label: (
        <Link
          onClick={() =>
            dispatch(rechangeToken("/dashboard/settings", navigate))
          }
          to="#"
          className="text-base py-1"
        >
          Ayarlar
        </Link>
      ),
      icon: <MdOutlineSettings size={18} />,
      key: "1",
    },
    {
      label: (
        <Link to={"#"} className="text-base py-1">
          Aktivite
        </Link>
      ),
      icon: <TbActivity size={18} />,
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: <a className="text-base py-1">Çıkış Yap</a>,
      icon: <MdLogout size={18} />,
      onClick: async () => {
        dispatch(setSignoutLoading(true));
        try {
          const response = await createData(api.AuthApi.logout, {});
          if (response) {
            navigate("/");
            localStorage.removeItem("trpos__access_token");
            localStorage.removeItem("trpos__user_info");
            localStorage.removeItem("trpos__user_type");
            localStorage.removeItem("trpos__token_expire");
            localStorage.removeItem("trpos__company_title");
          }
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setSignoutLoading(false));
        }
      },
      key: "4",
      // danger: true,
      // disabled: true,
    },
  ];

  return items;
};
