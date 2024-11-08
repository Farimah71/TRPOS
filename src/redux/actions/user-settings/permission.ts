import { api } from "../../../api";
import { AppDispatch } from "../../store/store";
import { createData } from "../../../core/http-service";
import { AxiosResponse } from "axios";
import { setPermissionInfo } from "../../reducers/user-settings/permission";

export const getAllPermissions = () => async (dispatch: AppDispatch) => {
  try {
    const response: AxiosResponse = await createData(
      api.settingsApi.getAllPermission,
      null
    );
    dispatch(setPermissionInfo(response.data));
  } catch (error: any) {
    console.log(error);
  } finally {
  }
};
