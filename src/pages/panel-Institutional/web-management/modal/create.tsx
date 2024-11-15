import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../../components/button";
import { CheckBox } from "../../../../components/checkboxes";
import { Divider } from "../../../../components/divider";
import { Input } from "../../../../components/input";
import { Modal } from "../../../../components/modal";
import { SelectInput } from "../../../../components/select";
import { FileUploader } from "../../../../components/uploader";
import { BaseModalProps } from "../../../../types/modal.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { websiteAdd } from "../../../../redux/actions/institutional/website";
import { useEffect } from "react";
import * as yup from "yup";

interface CreateInstitutionalWebsiteInputType {
  iban: string;
  nameSurname: string;
  title: string;
  name: string;
  siteURL: string;
  successRedirectURL: string;
  failRedirectURL: string;
  ip: string;
  installmentType: string;
  currencyId: string;
  file: any;
  confirm: boolean;
}

export const CreateInstitutionalWebsiteModal: React.FC<BaseModalProps> = ({
  state,
  onCloseModal,
}) => {
  const dispatch = useAppDispatch();

  const validate = yup.object().shape({
    iban: yup.string().required(),
    nameSurname: yup.string().required(),
    title: yup.string().required(),
    name: yup.string().required(),
    siteURL: yup.string().required(),
    successRedirectURL: yup.string().required(),
    failRedirectURL: yup.string().required(),
    ip: yup.string().required(),
    installmentType: yup.string().required(),
    currencyId: yup.string().required(),
    file: yup.mixed().required(),
    confirm: yup.boolean().oneOf([true]).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
  } = useForm<CreateInstitutionalWebsiteInputType>({
    resolver: yupResolver(validate),
    mode: "all",
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  console.log(errors);

  const onSubmit: SubmitHandler<CreateInstitutionalWebsiteInputType> = (
    data
  ) => {
    dispatch(websiteAdd(data));
  };

  return (
    <Modal
      state={state}
      title="Yeni Site Ekle"
      small={true}
      onCloseModal={onCloseModal}
      subTitle="Lütfen formu doldurunuz."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divider text="Hesap Bilgileri" />
        <div className="p-1">
          <Input
            label="Hakediş Hesap IBAN Numarası"
            register={{ ...register("iban") }}
          />
          <Input
            label="Hesap Sahibi Adı Soyadı"
            className="mt-3"
            register={{ ...register("nameSurname") }}
          />
          <Input label="Banka Hesabı Başlığı" className="mt-3" />
        </div>

        <Divider text="Web Site Bilgileri" />
        <div className="p-1">
          <Input label="Web Site Başlığı" register={{ ...register("title") }} />
          <Input
            label="Web Site / İş Yeri / Mağaza Adı"
            className="mt-3"
            register={{ ...register("name") }}
          />
          <Input
            label="Web Site URL Adresi"
            className="mt-3"
            register={{ ...register("siteURL") }}
          />
          <Input
            label="Başarılı İşlem Yönelnedirme Adresi"
            className="mt-3"
            register={{ ...register("successRedirectURL") }}
          />
          <Input
            label="Hatalı İşlem Yönlendirme Adresi"
            className="mt-3"
            register={{ ...register("failRedirectURL") }}
          />
          <Input
            label="Web Site IP Adresi"
            className="mt-3"
            register={{ ...register("ip") }}
          />
        </div>

        <Divider text="Diğer Bilgiler" />
        <div className="p-1 flex flex-col gap-y-3">
          <SelectInput
            placeholder="Taksit Seçeneği"
            options={[
              {
                value: 1,
                label: "PEŞİN",
              },
              {
                value: 2,
                label: "TAKSIT",
              },
            ]}
            error={""}
            isError={false}
            name="installmentType"
            control={control}
          />
          <SelectInput
            placeholder="E-Ticaret Altyapı Sağlayıcı"
            options={[
              {
                value: 1,
                label: "magento",
              },
            ]}
            error={""}
            isError={false}
            name="currencyId"
            control={control}
          />
          <FileUploader id="Dekont" register={{ ...register("file") }} />
        </div>

        <CheckBox
          id="checkbox"
          isChecked={false}
          label="Bilgilerin doğruluğunu onaylıyorum."
          className="mt-4 !text-sm !font-normal"
          register={{ ...register("confirm") }}
        />

        <Button
          variant="primary"
          shape="full"
          size="medium"
          className="mt-6 !text-base !font-medium"
          type="submit"
          isDisabled={Object.keys(errors).length > 0 ? true : false}
        >
          Onaya Gönder
        </Button>
      </form>
    </Modal>
  );
};
