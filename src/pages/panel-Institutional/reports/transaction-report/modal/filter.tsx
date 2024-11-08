import { Button } from "../../../../../components/button"
import { Divider } from "../../../../../components/divider"
import { Input } from "../../../../../components/input"
import { Modal } from "../../../../../components/modal"
import { SelectInput } from "../../../../../components/select"
import { BaseModalProps } from "../../../../../types/modal.types"

export const FilterModal:React.FC<BaseModalProps> = ({
    state,
    onCloseModal
} : BaseModalProps) => {
    return (
        <Modal
        state={state}
        title="İşlem Detayları"
        small={true}
        onCloseModal={onCloseModal}
        subTitle="Lütfen formu doldurunuz."
      >
        <Divider text="Tarih Aralığı" />
        <div className="p-1">
          <Input label="Başlangıç Tarihi" type="date" />
          <Input label="Bitiş Tarihi" type="date" className="mt-3" />
        </div>

        <Divider text="Daha Fazla Filtre" />
        <div className="p-1">
          <SelectInput placeholder="İşlem Türü" />
          <SelectInput placeholder="İşlem Tipi" className="mt-3" />
          <SelectInput placeholder="WEB Site" className="mt-3" />
          <SelectInput placeholder="İşlem Yapılan Banka" className="mt-3" />
          <SelectInput placeholder="Para Birimi" className="mt-3" />
          <SelectInput placeholder="Satış" className="mt-3" />
        </div>

        <Button
            variant="primary"
            shape="full"
            size="medium"
            className="mt-6 !text-base !font-medium"
            >
                Uygula
        </Button>

      </Modal>
    )
}