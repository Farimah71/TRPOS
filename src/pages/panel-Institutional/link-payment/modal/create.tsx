import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../../components/button";
import { CheckBox } from "../../../../components/checkboxes";
import { Divider } from "../../../../components/divider";
import { Input } from "../../../../components/input";
import { Modal } from "../../../../components/modal";
import { BaseModalProps } from "../../../../types/modal.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { SelectInput } from "../../../../components/select";
import { InputErrorComponent } from "../../../../components/inputError";
import { getAllActiveWebsites } from "../../../../redux/actions/settings/active-website";
import { convertArrayToSelectOptions } from "../../../../helper/convert-array-to-select-options";
import { SelectOption } from "../../../../types/select-option.types";
import { addProduct } from "../../../../redux/actions/institutional/product";
import TextArea from "antd/es/input/TextArea";
import * as yup from "yup";

interface CreateInstitutionalLinkInputType {
  vPosProductDto: {
    siteId: number;
    title: string;
    description: string;
    linkUrl?: string;
    count?: number;
    isInstallment: boolean;
    referenceUrl: string;
    expiryDate: string;
    isActive: boolean;
    confirm: boolean;
  };
  vPosProductPricingModels: {
    price: string;
    installment: number;
  };
}

type Props = {
  isReload: () => void;
};

export const CreateInstitutionalWebsiteModal: React.FC<
  BaseModalProps & Props
> = ({ state, isReload, onCloseModal }) => {
  const [selectOption, setSelectOption] = useState<{
    websites: SelectOption[];
    installments: SelectOption[];
  }>({
    websites: [],
    installments: [],
  });

  const { info: activeWebsitesInfo, loading: activeWebsitesLoading } =
    useAppSelector((state) => state.activeWebsiteSlice);
  const { isButtonLoading } = useAppSelector(
    (state) => state.buttonLoadingSlice
  );

  const dispatch = useAppDispatch();

  const validate = yup
    .object()
    .shape({
      vPosProductDto: yup
        .object()
        .shape({
          siteId: yup.number().required(),
          title: yup
            .string()
            .min(5, "Başlık 5 karakterden az olamaz.")
            .required("Başlık zorunlu bir alandır"),
          description: yup
            .string()
            .min(5, "Açıklama 5 karakterden az olamaz.")
            .required("Açıklama zorunlu bir alandır"),
          linkUrl: yup.string(),
          count: yup.number(),
          isInstallment: yup.boolean().required(),
          referenceUrl: yup
            .string()
            .required("Referans URL adresi zorunlu bir alandır")
            .matches(
              /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\.([a-z\.]{2,6})/,
              "URL https:// ile başlamalıdır"
            ),
          expiryDate: yup.string().required(),
          isActive: yup.boolean().required(),
          confirm: yup.boolean().oneOf([true]).required(),
        })
        .required(),
      vPosProductPricingModels: yup
        .object()
        .shape({
          price: yup.string().required(),
          installment: yup.number().required(),
        })
        .required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    control,
    setValue,
    reset,
  } = useForm<CreateInstitutionalLinkInputType>({
    defaultValues: {
      vPosProductDto: {
        siteId: 1,
        isActive: true,
        isInstallment: true,
        count: 0,
      },
      vPosProductPricingModels: { installment: 1 },
    },
    resolver: yupResolver(validate),
    mode: "all",
  });

  useEffect(() => {
    dispatch(getAllActiveWebsites({ pageNumber: 0, pageSize: 0 }));
  }, []);
  useEffect(() => {
    if (activeWebsitesInfo?.length) {
      const options = convertArrayToSelectOptions(activeWebsitesInfo, [
        "id",
        "title",
      ]);
      setSelectOption((prev) => ({ ...prev, websites: options }));
    }
  }, [activeWebsitesInfo]);
  useEffect(() => {
    trigger();
  }, [trigger]);
  useEffect(() => {
    reset();
    trigger();
  }, [isReload]);

  const priceChangeHandler = (price: string) => {
    const numbers = price.replace(/[^\d]/g, ""); // Remove non-digit characters
    const formattedValue = "₺ " + numbers;
    setValue("vPosProductPricingModels.price", formattedValue);
  };
  const onSubmit: SubmitHandler<CreateInstitutionalLinkInputType> = async (
    data
  ) => {
    const dataToSend = {
      vPosProductDto: {
        siteId: data.vPosProductDto?.siteId,
        title: data.vPosProductDto?.title,
        description: data.vPosProductDto?.description
          ? data.vPosProductDto?.description
          : "",
        linkUrl: data.vPosProductDto?.referenceUrl,
        count: data.vPosProductDto?.count,
        isInstallment: data.vPosProductDto?.isInstallment,
        referenceUrl: data.vPosProductDto?.referenceUrl,
        expiryDate: data.vPosProductDto?.expiryDate,
        isActive: data.vPosProductDto?.isActive,
      },
      vPosProductPricingModels: [
        {
          price: data.vPosProductPricingModels?.price.slice(2),
          installment: data.vPosProductPricingModels?.installment,
        },
      ],
    };
    dispatch(addProduct(dataToSend, () => isReload()));
  };

  return (
    <Modal
      state={state}
      title="Yeni Ödeme Linki Ekle"
      subTitle="Lütfen formu doldurunuz."
      onCloseModal={onCloseModal}
      small
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divider text="Genel Bilgiler" />
        <div className="p-1">
          <div>
            <SelectInput
              name="siteId"
              control={control}
              placeholder="Web Site"
              options={selectOption.websites}
              isLoading={activeWebsitesLoading}
              touched={touchedFields.vPosProductDto?.siteId}
              error={errors.vPosProductDto?.siteId?.message}
            />
            {touchedFields.vPosProductDto?.siteId && (
              <InputErrorComponent
                text={errors.vPosProductDto?.siteId?.message}
              />
            )}
          </div>
          <div>
            <Input
              label="Ürün Hizmet Adı"
              className="mt-3"
              register={{ ...register("vPosProductDto.title") }}
              touched={touchedFields.vPosProductDto?.title}
              error={errors.vPosProductDto?.title?.message}
            />
            {touchedFields.vPosProductDto?.title && (
              <InputErrorComponent
                text={errors.vPosProductDto?.title?.message}
              />
            )}
          </div>
          <div>
            <Controller
              name="vPosProductDto.description"
              control={control}
              render={({ field }) => (
                <TextArea
                  rows={3}
                  placeholder="Ürün Açıklaması"
                  className="text_area mt-3"
                  {...field}
                />
              )}
            />
            {touchedFields.vPosProductDto?.description && (
              <InputErrorComponent
                text={errors.vPosProductDto?.description?.message}
              />
            )}
          </div>
        </div>

        <Divider text="Fiyatlar" />
        <div className="p-1">
          <div>
            <Input
              label="Ürün Peşin Fiyatı"
              register={{ ...register("vPosProductPricingModels.price") }}
              touched={touchedFields.vPosProductPricingModels?.price}
              error={errors.vPosProductPricingModels?.price?.message}
              onChange={(e) => priceChangeHandler(e.target.value)}
            />
            {touchedFields.vPosProductPricingModels?.price && (
              <InputErrorComponent
                text={errors.vPosProductPricingModels?.price?.message}
              />
            )}
          </div>
          <div>
            <SelectInput
              name="vPosProductPricingModels.installment"
              control={control}
              placeholder="Taksit Seçeneği"
              options={selectOption.installments}
              className="mt-3"
              register={{ ...register("vPosProductPricingModels.installment") }}
              touched={touchedFields.vPosProductPricingModels?.installment}
              error={errors.vPosProductPricingModels?.installment?.message}
            />
            {touchedFields.vPosProductPricingModels?.installment && (
              <InputErrorComponent
                text={errors.vPosProductPricingModels?.installment?.message}
              />
            )}
          </div>
        </div>

        <Divider text="Daha Fazla Detay" />
        <div className="p-1">
          <div>
            <Input
              label="Link Bitiş Tarihi"
              type="date"
              register={{ ...register("vPosProductDto.expiryDate") }}
              touched={touchedFields.vPosProductDto?.expiryDate}
              error={errors.vPosProductDto?.expiryDate?.message}
            />
            {touchedFields.vPosProductDto?.expiryDate && (
              <InputErrorComponent
                text={errors.vPosProductDto?.expiryDate?.message}
              />
            )}
          </div>
          <div>
            <Input
              label="Ödeme Adedi"
              className="mt-3"
              register={{ ...register("vPosProductDto.count") }}
              touched={touchedFields.vPosProductDto?.count}
              error={errors.vPosProductDto?.count?.message}
              type="number"
            />
            {touchedFields.vPosProductDto?.count && (
              <InputErrorComponent
                text={errors.vPosProductDto?.count?.message}
              />
            )}
          </div>
          <div>
            <Input
              label="Referans URL Adresi"
              className="mt-3"
              register={{ ...register("vPosProductDto.referenceUrl") }}
              touched={touchedFields.vPosProductDto?.referenceUrl}
              error={errors.vPosProductDto?.referenceUrl?.message}
            />
            {touchedFields.vPosProductDto?.referenceUrl && (
              <InputErrorComponent
                text={errors.vPosProductDto?.referenceUrl?.message}
              />
            )}
          </div>
        </div>

        <CheckBox
          id="checkbox"
          isChecked={false}
          label="Bilgilerin doğruluğunu onaylıyorum."
          className="mt-4 !text-sm !font-normal"
          register={{ ...register("vPosProductDto.confirm") }}
        />

        <Button
          type="submit"
          variant="primary"
          shape="full"
          size="medium"
          className="mt-6 !text-base !font-medium"
          isDisabled={Object.keys(errors).length > 0 ? true : false}
          isLoading={isButtonLoading}
        >
          Onaya Gönder
        </Button>
      </form>
    </Modal>
  );
};
