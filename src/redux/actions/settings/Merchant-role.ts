import { api } from "../../../api";
import { createData } from "../../../core/http-service";
// import { setErrors } from "../../reducers/errors";
import { AppDispatch } from "../../store/store";
import { AxiosResponse } from "axios";
// import { setContentLoading } from "../../reducers/content-loading";
import {
  setMerchantRoleInfo,
  setMerchantRoleLoading,
} from "../../reducers/settings/Merchant-roles";

export const getMerchantRole = () => async (dispatch: AppDispatch) => {
  dispatch(setMerchantRoleLoading(true));
  try {
    const response: AxiosResponse = await createData(
      api.settingsApi.getMerchantRoles,
      {}
    );
    dispatch(setMerchantRoleInfo(response.data));
  } catch (error: any) {
    // error.statusCode == 400 && dispatch(setErrors(error.message));
    console.log(error);
  } finally {
    dispatch(setMerchantRoleLoading(false));
  }
};
