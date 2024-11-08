import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/sidebar";
import { Header } from "../components/layout/header";
import { Loading } from "../components/loading";
import { useAppSelector } from "../hooks/redux-hooks";

const PanelLayout = () => {
  const [isToggled, setIsToggled] = useState(true);

  const { loading: signoutLoading } = useAppSelector(
    (state) => state.signoutSlice
  );

  return (
    <>
      {signoutLoading && (
        <div className="flex items-center justify-center fixed w-full h-full backdrop-blur-[3px] z-[9999]">
          <Loading />
        </div>
      )}
      <div
        className={`layout w-full min-h-screen bg-base-gray transition-all duration-300 select-none ${
          isToggled ? "ps-[240px]" : "ps-[60px]"
        }`}
      >
        <Sidebar
          isToggled={isToggled}
          setIsToggled={() => setIsToggled((prev) => !prev)}
        />

        <div className="w-full grid grid-rows-[100px_auto_1fr]">
          <Header isToggled={isToggled} />
          <main
            className={`duration-500 ease-linear pe-8 ${
              isToggled ? "ps-12" : "ps-14"
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default PanelLayout;
