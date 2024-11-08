import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../../components/button";
import { Divider } from "../../../../components/divider";
import { Input } from "../../../../components/input";
import { Modal } from "../../../../components/modal";
import { SelectInput } from "../../../../components/select";
import { BaseModalProps } from "../../../../types/modal.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertArrayToSelectOptions } from "../../../../helper/convert-array-to-select-options";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux-hooks";
import { SelectOption } from "../../../../types/select-option.types";
import { PhoneInput } from "../../../../components/phone-input";
import { parsePhoneNumber } from "../../../../helper/parse-phone";
import * as yup from "yup";
import { addCompanyPerson } from "../../../../redux/actions/institutional/user-authorization";
import { getMerchantRole } from "../../../../redux/actions/settings/Merchant-role";

type Props = {
  isReload: () => void;
};

interface CreateUserAuthenticationInputs {
  AuthPhoneNumber: string;
  AuthName: string;
  AuthSurname?: string;
  AuthEmail: string;
  RoleId: string;
}

export const CreateUserAuthentication: React.FC<BaseModalProps & Props> = ({
  state,
  isReload,
  onCloseModal,
}) => {
  const [selectOption, setSelectOption] = useState<SelectOption[]>([]);

  const { info: roleInfo, loading: roleLoading } = useAppSelector(
    (state) => state.MerchantRoleSlice
  );
  const { isButtonLoading } = useAppSelector(
    (state) => state.buttonLoadingSlice
  );

  const dispatch = useAppDispatch();

  const validate = yup.object().shape({
    AuthName: yup.string().required().min(5),
    AuthSurname: yup.string(),
    AuthPhoneNumber: yup
      .string()
      .required("Telefon numarası gerekli")
      .matches(
        /^\+([1-9]{1})([0-9]{1,2})?([0-9]{10})$/,
        "Biçim: +901234567890"
      ),
    AuthEmail: yup
      .string()
      .required()
      .matches(/^(?=.{8,50}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),
    RoleId: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    control,
    reset,
  } = useForm<CreateUserAuthenticationInputs>({
    resolver: yupResolver(validate),
    mode: "all",
  });

  useEffect(() => {
    dispatch(getMerchantRole());
  }, []);
  useEffect(() => {
    trigger();
  }, [trigger]);
  useEffect(() => {
    reset();
    trigger();
  }, [isReload]);
  useEffect(() => {
    if (roleInfo.length) {
      const options = convertArrayToSelectOptions(roleInfo, ["id", "name"]);
      options && setSelectOption(options);
    }
  }, [roleInfo]);

  const onSubmit: SubmitHandler<CreateUserAuthenticationInputs> = (data) => {
    const parsedPhone = parsePhoneNumber(data.AuthPhoneNumber);
    const separatedName = data.AuthName.split(" ");

    const dataToSend = {
      ...data,
      AuthPhoneNumber: parsedPhone?.number,
      AuthName: separatedName[0],
      AuthSurname: separatedName[1],
    };
    dispatch(addCompanyPerson(dataToSend, () => isReload()));
  };

  return (
    <Modal
      state={state}
      onCloseModal={onCloseModal}
      title="Yeni Kullanıcı Ekle"
      subTitle="Lütfen formu doldurunuz."
      small
    >
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Divider text="Genel Bilgiler" />
        <Input
          label="Adı - Soyadı"
          register={{ ...register("AuthName") }}
          error={errors.AuthName?.message}
          touched={touchedFields.AuthName}
        />
        <PhoneInput
          label="Telefonu"
          register={{ ...register("AuthPhoneNumber") }}
          error={errors.AuthPhoneNumber?.message}
          touched={touchedFields.AuthPhoneNumber}
        />
        <Input
          label="E-Posta Adresi"
          register={{ ...register("AuthEmail") }}
          error={errors.AuthEmail?.message}
          touched={touchedFields.AuthEmail}
        />
        <SelectInput
          placeholder="Görev"
          name="RoleId"
          control={control}
          options={selectOption}
          touched={touchedFields.RoleId}
          error={errors.RoleId?.message}
          isLoading={roleLoading}
        />
        <Button
          variant="primary"
          className="mt-2"
          type="submit"
          isDisabled={Object.keys(errors).length > 0 ? true : false}
          isLoading={isButtonLoading}
        >
          Ekle
        </Button>
      </form>
    </Modal>
  );
};
