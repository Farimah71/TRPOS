import { AxiosResponse } from "axios";
import { api } from "../../../api";
import { createData } from "../../../core/http-service";
import { AppDispatch } from "../../store/store";
import { setContentLoading } from "../../reducers/content-loading";
import { setButtonLoading } from "../../reducers/button-loading";
import { setErrors } from "../../reducers/errors";
import { setShowModal } from "../../reducers/show-modal";
import { setUserAuthorizationInfo } from "../../reducers/institutional/user-authorization";

export const getAllCompanyPerson =
  (data: {}) => async (dispatch: AppDispatch) => {
    dispatch(setContentLoading(true));
    try {
      const response: AxiosResponse = await createData(
        api.settingsApi.companyPersonList,
        data
      );

      dispatch(setUserAuthorizationInfo(response.data));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setContentLoading(false));
    }
  };

export const addCompanyPerson =
  (data: {}, setState: () => void) => async (dispatch: AppDispatch) => {
    dispatch(setButtonLoading(true));
    try {
      await createData(api.settingsApi.addCompanyPerson, data);
      dispatch(setShowModal({ isShow: true, type: "success" }));
    } catch (error: any) {
      console.log(error);
      dispatch(setErrors(error.message));
      dispatch(setShowModal({ isShow: true, type: "error" }));
    } finally {
      dispatch(setButtonLoading(false));
      setState();
    }
  };

export const removeRoleCompanyUser =
  (data: {}, setState: () => void) => async (dispatch: AppDispatch) => {
    dispatch(setButtonLoading(true));
    try {
      await createData(api.settingsApi.removeRoleToCompanyUser, data);
    } catch (error: any) {
      console.log(error);
      dispatch(setErrors(error.message));
      dispatch(setShowModal({ isShow: true, type: "error" }));
    } finally {
      dispatch(setButtonLoading(false));
      setState();
    }
  };
