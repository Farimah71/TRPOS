import { useForm } from "react-hook-form";
import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { Modal } from "../../../../components/modal";
import { SelectInput } from "../../../../components/select";
import { SettingModalsProps } from "./setting-modals.types";

export const EditPassword: React.FC<SettingModalsProps> = ({
  state,
  onCloseModal,
}) => {
  const { control } = useForm();

  return (
    <Modal
      title="Şifremi Değiştir"
      subTitle="Şifrenizi güncelleyebilirsiniz."
      state={state}
      onCloseModal={onCloseModal}
      small
    >
      <form className="flex flex-col gap-y-2">
        <Input label="Mevcut Şifreniz" isPassword />
        <Input label="Yeni Şifreniz" isPassword />
        <Input label="Yeni Şifreniz (Tekrardan)" isPassword />
        <SelectInput
          name=""
          control={control}
          placeholder="Şifre Değiştirme Süresi"
          options={[
            { value: 3, label: "3 ay" },
            { value: 6, label: "6 ay" },
            { value: 12, label: "1 yıl" },
          ]}
        />
        <Button variant="primary" shape="full" className="my-2">
          Devam Et
        </Button>
      </form>
    </Modal>
  );
};
