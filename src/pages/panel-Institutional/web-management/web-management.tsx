import { useEffect, useState } from "react";
import { NoContentInstitutionalWebManagement } from "./components/no-content";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { getAllWebsite } from "../../../redux/actions/institutional/website";
import { CreateInstitutionalWebsiteModal } from "./modal/create";
import { TopLoader } from "../../../components/top-loader";
import { GridInstitutionalWebManagement } from "./components/grid";

const WebManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { info: websites } = useAppSelector((state) => state.websiteSlice);
  const { isContentLoading } = useAppSelector(
    (state) => state.contentLoadingSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getAllWebsite({
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
      {isContentLoading ? (
        <TopLoader />
      ) : websites.length ? (
        <GridInstitutionalWebManagement setIsOpenModal={setIsModalOpen} />
      ) : (
        <NoContentInstitutionalWebManagement setIsOpenModal={setIsModalOpen} />
      )}
      <CreateInstitutionalWebsiteModal
        state={isModalOpen}
        onCloseModal={closeModalHandler}
      />
    </>
  );
};

export default WebManagement;
