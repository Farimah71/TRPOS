import { AxiosResponse } from "axios";
import { api } from "../../../api";
import { createData } from "../../../core/http-service";
import { setErrors } from "../../reducers/errors";
import { AppDispatch } from "../../store/store";
import { setRechangeTokenLoading } from "../../reducers/rechange-token/rechange-token";

export const rechangeToken =
  (path: string, navigate: any) => async (dispatch: AppDispatch) => {
    dispatch(setRechangeTokenLoading(true));
    try {
      const response: AxiosResponse = await createData(
        api.AuthApi.rechangeToken,
        {}
      );

      localStorage.trpos__access_token = response?.data?.token;
      localStorage.trpos__token_expire = response?.data?.expiration;

      navigate(path, { state: { token: localStorage.trpos__access_token } });
    } catch (error: any) {
      console.log(error);
      if (error.statusCode == "423" || error.statusCode == "400") {
        dispatch(setErrors(error.message));
      }
    } finally {
      dispatch(setRechangeTokenLoading(false));
    }
  };
