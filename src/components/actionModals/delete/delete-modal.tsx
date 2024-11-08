import { Button } from "../../button";
import { Modal } from "../../modal";
import { ActionModalProps } from "../action-modal.types";
import DeleteIcon from "../../../assets/images/DeleteFillRed.svg";

export const DeleteModal: React.FC<ActionModalProps> = ({
  state,
  subTitle,
  confirmLabel,
  isLoading,
  onCloseModal,
  onSubmit,
}) => {
  return (
    <Modal
      state={state}
      title="Silmek istediğinden emin misin?"
      subTitle={subTitle}
      icon={<img src={DeleteIcon} width={50} />}
      onCloseModal={onCloseModal}
      isActionModal
      small
    >
      <div className="flex gap-x-6 mt-3">
        <Button variant="neutral" shape="wide" isOutline onClick={onCloseModal}>
          İptal
        </Button>
        <Button
          variant="error"
          shape="wide"
          className="!text-white"
          onClick={onSubmit}
          isLoading={isLoading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
