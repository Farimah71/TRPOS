import { Router } from "./routes";
import { useEffect } from "react";
import { useGetClientIp } from "./hooks/get-client-ip";
import { useAppDispatch } from "./hooks/redux-hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { setIP } from "./redux/reducers/_ip";
import { notification } from "antd";
import "./assets/fonts/style.css";

export default function App() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();

  localStorage.trpos__lng = "TR";

  useEffect(() => {
    fetchIp();
  }, []);

  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!state?.token) {
      localStorage.removeItem("trpos__token");
      localStorage.removeItem("trpos__access_token");
      navigate("/login");
    }
  }, [pathname]);

  const fetchIp = async () => {
    const clientIp = await useGetClientIp();
    dispatch(setIP(clientIp));
  };

  window.onoffline = () => showToast();
  window.ononline = () => {
    api.destroy("warn_offline");
  };

  const showToast = () => {
    api["warning"]({
      key: "warn_offline",
      message: "Çevrimdışısınız!",
      description: "Bağlantınızı kontrol edin",
      placement: "top",
      duration: 0,
    });
  };

  return (
    <>
      {contextHolder}
      <Router />
    </>
  );
}
