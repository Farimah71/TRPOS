import { IconArrowRight } from "../../../components/icons/icons";
import { CreateUserAuthentication } from "./modal/create";
import { useEffect, useState } from "react";
import { EditUserAuthentication } from "./modal/edit";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import {
  getAllCompanyPerson,
  removeRoleCompanyUser,
} from "../../../redux/actions/institutional/user-authorization";
import { NoContentInstitutionalUserAuthorization } from "./components/no-content";
import { TopLoader } from "../../../components/top-loader";
import { UserAuthorizationGrid } from "./components/grid";
import { SuccessModal } from "../../../components/actionModals/success";
import { setShowModal } from "../../../redux/reducers/show-modal";
import { ErrorModal } from "../../../components/actionModals/error";
import { DeleteModal } from "../../../components/actionModals/delete";

type ModalTypes = "create" | "edit" | "delete" | "";

const UserAuthorization = () => {
  const [isOpenModal, setIsOpenModal] = useState<{
    type: ModalTypes;
    data?: {};
  }>({
    type: "",
    data: undefined,
  });

  const { showModal } = useAppSelector((state) => state.showModalSlice);
  const { errors } = useAppSelector((state) => state.errorsSlice);
  const { isContentLoading } = useAppSelector(
    (state) => state.contentLoadingSlice
  );
  const { isButtonLoading } = useAppSelector(
    (state) => state.buttonLoadingSlice
  );
  const { info: userAuthorizationInfo } = useAppSelector(
    (state) => state.userAuthorizationSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCompanyPerson({}));
  }, []);

  const closeModalHandler = () => {
    isOpenModal && setIsOpenModal({ type: "" });
  };

  return (
    <>
      {showModal.type == "success" && (
        <SuccessModal
          state={showModal.isShow}
          subTitle="Talebinizi aldık."
          title="Kullanıcı başarıyla kaydedildi"
          confirmLabel="Ana Sayfaya Dön"
          onSubmit={() => {
            dispatch(setShowModal({ isShow: false, type: "success" }));
            dispatch(getAllCompanyPerson({}));
          }}
        />
      )}
      {showModal.type == "error" && (
        <ErrorModal
          state={showModal.isShow}
          subTitle={+errors[0] ? errors[1] : errors[0]}
        />
      )}
      {isOpenModal.type == "delete" && (
        <DeleteModal
          state={isOpenModal.type == "delete"}
          confirmLabel="Kullanıcıyı sil"
          onCloseModal={closeModalHandler}
          isLoading={isButtonLoading}
          onSubmit={() =>
            dispatch(
              removeRoleCompanyUser(isOpenModal?.data!, () => {
                closeModalHandler;
                dispatch(getAllCompanyPerson({}));
              })
            )
          }
        />
      )}

      {isContentLoading && <TopLoader />}
      <CreateUserAuthentication
        state={isOpenModal.type == "create"}
        onCloseModal={closeModalHandler}
        isReload={closeModalHandler}
      />
      <EditUserAuthentication
        state={isOpenModal.type == "edit"}
        onCloseModal={closeModalHandler}
      />
      <div className="w-full flex items-center gap-6 text-sm text-base-content-40 py-4">
        <p>Trpos</p>
        <IconArrowRight width={20} height={20} viewBox="0 0 20 20" />
        <p className="text-primary font-medium">Kullanıcı Yönetimi</p>
      </div>
      {userAuthorizationInfo?.length ? (
        <UserAuthorizationGrid
          data={userAuthorizationInfo}
          setIsModalOpen={setIsOpenModal}
        />
      ) : (
        <NoContentInstitutionalUserAuthorization
          setIsModalOpen={setIsOpenModal}
        />
      )}
    </>
  );
};

export default UserAuthorization;
