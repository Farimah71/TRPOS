import React, { Dispatch, SetStateAction } from "react";
import { IconArrowRight, IconPlus } from "../../../../components/icons/icons";
import { Button } from "../../../../components/button";
import clouds from "../../../../assets/images/Clouds.svg";

type Props = {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const NoContentInstitutionalWebManagement: React.FC<Props> = ({
  setIsOpenModal,
}) => {
  return (
    <>
      <div className="w-full flex items-center gap-6 text-sm text-base-content-40 pt-4">
        <p>Trpos</p>
        <IconArrowRight width={20} height={20} viewBox="0 0 20 20" />
        <p>Web Site Yönetimi</p>
      </div>
      <div className="outlet w-full h-full pt-4">
        <div className="w-full h-screen bg-actual-white rounded-2.5xl p-6">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between items-center">
              <div>
                <h1 className="text-[20px] text-base-content font-semibold">
                  Web Siteleriniz
                </h1>
                <p className="subTitle_text text-xs text-base-content-40 mt-2">
                  Lorem, ipsum.
                </p>
              </div>
              <div>
                <Button
                  onClick={() => setIsOpenModal(true)}
                  variant="primary"
                  className="text-sm !rounded-2xl"
                  isInTop
                >
                  <IconPlus width={24} hanging={24} viewBox="0 0 24 24" />
                  Yeni Site Oluştur
                </Button>
              </div>
            </div>
            <div className="outlet w-full h-full flex-grow flex justify-center items-center">
              <div className="text-center">
                <img src={clouds} alt="" />
                <h1 className="text-base-content mt-2">
                  Hiç bir site eklemedin
                </h1>
                <p className="text-xs text-base-content-40 mt-1">Şimdilik...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
