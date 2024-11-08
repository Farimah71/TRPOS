import { AxiosResponse } from "axios";
import { api } from "../../../api";
import { createData } from "../../../core/http-service";
import { setButtonLoading } from "../../reducers/button-loading";
import { setErrors } from "../../reducers/errors";
import { AppDispatch } from "../../store/store";

export const changeToken =
  (data: {}, navigate: any) => async (dispatch: AppDispatch) => {
    dispatch(setButtonLoading(true));
    try {
      const response: AxiosResponse = await createData(
        api.AuthApi.changeToken,
        data
      );

      localStorage.trpos__access_token = response?.data?.token;
      localStorage.trpos__user_info = JSON.stringify(response?.data?.userInfo);
      localStorage.trpos__user_type = response?.data?.userInfo?.userType;
      localStorage.trpos__token_expire = response?.data?.expiration;

      if (response?.data?.userInfo?.userType == 2) {
        navigate("/dashboard/Institutional/panel", {
          state: { token: localStorage.trpos__access_token },
        });
      } else if (response?.data?.userInfo?.userType == 1) {
        navigate("/dashboard/personal/panel", {
          state: { token: localStorage.trpos__access_token },
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error.statusCode == "423" || error.statusCode == "400") {
        dispatch(setErrors(error.message));
      }
    } finally {
      dispatch(setButtonLoading(false));
    }
  };
