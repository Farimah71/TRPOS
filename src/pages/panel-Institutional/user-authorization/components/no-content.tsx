import React, { Dispatch, SetStateAction } from "react";
import { IconPlus } from "../../../../components/icons/icons";
import { Button } from "../../../../components/button";
import clouds from "../../../../assets/images/Clouds.svg";

type ModalTypes = "create" | "edit" | "delete" | "";

type Props = {
  setIsModalOpen: Dispatch<SetStateAction<{ type: ModalTypes; data?: {} }>>;
};

export const NoContentInstitutionalUserAuthorization: React.FC<Props> = ({
  setIsModalOpen,
}) => {
  return (
    <>
      <div className="outlet w-full h-full pt-4">
        <div className="w-full h-screen bg-actual-white rounded-2.5xl p-6">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between items-center">
              <div>
                <h1 className="text-[20px] text-base-content font-semibold">
                  Kullanıcılar
                </h1>
                <p className="subTitle_text text-xs text-base-content-40 mt-2">
                  Lorem, ipsum.
                </p>
              </div>
              <div>
                <Button
                  onClick={() => setIsModalOpen({ type: "create" })}
                  variant="primary"
                  className="text-sm !rounded-2xl"
                  isInTop
                >
                  <IconPlus width={24} hanging={24} viewBox="0 0 24 24" />
                  Yeni kullanıcı oluştur
                </Button>
              </div>
            </div>
            <div className="outlet w-full h-full flex-grow flex justify-center items-center">
              <div className="text-center">
                <img src={clouds} alt="" />
                <h1 className="text-base-content mt-2">
                  Herhangi bir kullanıcı oluşturmadınız.
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
