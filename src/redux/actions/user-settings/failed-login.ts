import { api } from "../../../api";
import { AppDispatch } from "../../store/store";
import { createData } from "../../../core/http-service";
import { setFailedLoginInfo } from "../../../redux/reducers/user-settings/failed-login";
import { AxiosResponse } from "axios";

export const getFailedLogin = () => async (dispatch: AppDispatch) => {
  try {
    const response: AxiosResponse = await createData(
      api.settingsApi.failedLogins,
      null
    );
    dispatch(setFailedLoginInfo(response.data));
  } catch (error: any) {
    console.log(error);
  } finally {
  }
};
