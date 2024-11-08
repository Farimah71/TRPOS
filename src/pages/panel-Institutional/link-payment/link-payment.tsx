import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { IconArrowRight } from "../../../components/icons/icons";
import { getAllProducts } from "../../../redux/actions/institutional/product";
import { LinkPaymentGrid } from "./components/grid";
import { NoContentInstitutionalLinkPayments } from "./components/no-content";
import { TopLoader } from "../../../components/top-loader";
import { CreateInstitutionalWebsiteModal } from "./modal/create";
import { ErrorModal } from "../../../components/actionModals/error";
import { SuccessModal } from "../../../components/actionModals/success";
import { setShowModal } from "../../../redux/reducers/show-modal";

const LinkPayment = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { info: productInfo } = useAppSelector((state) => state.productSlice);
  const { showModal } = useAppSelector((state) => state.showModalSlice);
  const { errors } = useAppSelector((state) => state.errorsSlice);
  const { isContentLoading } = useAppSelector(
    (state) => state.contentLoadingSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getAllProducts({
        pageNumber: 0,
        pageSize: 0,
      })
    );
  }, []);

  const closeModalHandler = () => {
    isModalOpen && setIsModalOpen(false);
  };

  return (
    <>
      {showModal.type == "success" && (
        <SuccessModal
          state={showModal.isShow}
          title="Ön başvurunuzu aldık."
          confirmLabel="Ana Sayfaya Dön"
          onSubmit={() => {
            dispatch(setShowModal({ isShow: false, type: "success" }));
            dispatch(
              getAllProducts({
                pageNumber: 0,
                pageSize: 0,
              })
            );
          }}
        />
      )}
      {showModal.type == "error" && (
        <ErrorModal
          state={showModal.isShow}
          subTitle={+errors[0] ? errors[1] : errors[0]}
        />
      )}
      <div className="w-full flex items-center gap-6 text-sm text-base-content-40 pt-4">
        <p>Trpos</p>
        <IconArrowRight width={20} height={20} viewBox="0 0 20 20" />
        <p className="text-primary">Ödeme Linkleri</p>
      </div>
      {isContentLoading ? (
        <TopLoader />
      ) : productInfo?.length ? (
        <LinkPaymentGrid setIsModalOpen={setIsModalOpen} />
      ) : (
        <NoContentInstitutionalLinkPayments setIsModalOpen={setIsModalOpen} />
      )}
      <CreateInstitutionalWebsiteModal
        state={isModalOpen}
        onCloseModal={closeModalHandler}
        isReload={closeModalHandler}
      />
    </>
  );
};

export default LinkPayment;
