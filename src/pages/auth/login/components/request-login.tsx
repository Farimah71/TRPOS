import { useEffect } from "react";
import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInput } from "../types/login.types";
import { Link } from "react-router-dom";
import { parsePhoneNumber } from "../../../../helper/parse-phone";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { login } from "../../../../redux/actions/auth/login";
import * as yup from "yup";

export const RequestLogin: React.FC = () => {
  const { ip } = useAppSelector((state) => state.IpSlice);
  const { isButtonLoading } = useAppSelector(
    (state) => state.buttonLoadingSlice
  );

  const dispatch = useAppDispatch();

  const phoneRegex = /^\+?([1-9]{1})?([0-9]{1,2})?([0-9]{10})$/;
  const emailRegex =
    /^(?=.{8,50}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const loginSchema = yup.object().shape({
    phoneOrEmail: yup
      .string()
      .required()
      .test(
        "is_phone_or_email",
        "Telefon formatı: (+90)1234567... E-posta Formatı: kullanıcı@example.com",
        (value) => phoneRegex.test(value) || emailRegex.test(value)
      ),
    password: yup
      .string()
      .min(6, "Şifre 6 rakamdan oluşmalıdır")
      .max(6, "Maksimum 6 karakter")
      .required()
      .matches(
        /^(?!\d*(?:012|123|234|345|456|567|678|789|890|901|210|321|432|543|654|765|876|987|098|109))/,
        "Ardışık sayılardan oluşamaz"
      )
      .matches(/^\d{6}$/, "Yalnızca sayılara izin verilir")
      .matches(/^(?!.*(\d)(\1))\d+$/, "Tekrarlanan sayılardan oluşamaz"),
    phoneNumber: yup.string(),
    lang: yup.string().required(),
    phoneCountry: yup.string(),
    email: yup.string(),
    ip: yup.string(),
    version: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<LoginInput>({
    defaultValues: {
      lang: localStorage.trpos__lng,
      ip: "",
      version: "1",
    },
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    ip && setValue("ip", ip);
  }, [ip]);

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    if (+data.phoneOrEmail && data.phoneOrEmail.length > 11) {
      const parsedPhone = parsePhoneNumber(data.phoneOrEmail);
      dispatch(
        login({
          ...data,
          phoneCountry: parsedPhone?.country,
          phoneOrEmail: parsedPhone?.number!,
        })
      );
    } else if (+data.phoneOrEmail) {
      dispatch(
        login({
          ...data,
          phoneCountry: localStorage.trpos__lng,
        })
      );
    } else {
      dispatch(login(data));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full sm:bg-actual-white sm:p-8 rounded-2.5xl sm:shadow-sm -mt-10"
    >
      <div>
        <h1 className="xl:text-2xl text-base-content font-semibold">
          Giriş yap.
        </h1>
        <p className="text-sm text-base-content-60 t mt-2">
          Telefon ya da E-Postanız ile giriş yapınız.
        </p>
      </div>
      <div className="mt-6">
        <Input
          label="Cep No ya da E-Posta"
          register={{ ...register("phoneOrEmail") }}
          error={errors.phoneOrEmail?.message}
          touched={touchedFields.phoneOrEmail}
          className="mb-4"
          isPhoneOrEmail
        />
        <Input
          type="password"
          label="Şifre"
          register={{ ...register("password") }}
          error={errors.password?.message}
          touched={touchedFields.password}
          isPassword={true}
          autoComplete="new-password"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="medium"
        shape="full"
        className="mt-6"
        isDisabled={Object.keys(errors).length > 0 ? true : false}
        isLoading={isButtonLoading}
      >
        Devam Et
      </Button>
      <div className="w-full flex justify-center items-center gap-6 text-sm text-base-content-80 mt-6">
        <Link state={{ token: "isValid" }} to={"/change-phone"}>
          Telefon numaram değişti
        </Link>
        <div className="w-2 h-2 rounded-full bg-base-content/20"></div>
        <Link state={{ token: "isValid" }} to={"/forgot-password"}>
          Şifremi Unuttum
        </Link>
      </div>
    </form>
  );
};
