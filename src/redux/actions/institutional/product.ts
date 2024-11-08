import { AxiosResponse } from "axios";
import { api } from "../../../api";
import { createData } from "../../../core/http-service";
import { setProductInfo } from "../../reducers/institutional/product";
import { AppDispatch } from "../../store/store";
import { setContentLoading } from "../../reducers/content-loading";
import { setButtonLoading } from "../../reducers/button-loading";
import { setErrors } from "../../reducers/errors";
import { setShowModal } from "../../reducers/show-modal";

export const getAllProducts =
  (data: { pageNumber: number; pageSize: number }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setContentLoading(true));
    try {
      const response: AxiosResponse = await createData(
        api.settingsApi.getAllProduct,
        data
      );

      dispatch(setProductInfo(response.data));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setContentLoading(false));
    }
  };

export const addProduct =
  (data: {}, setState: () => void) => async (dispatch: AppDispatch) => {
    dispatch(setButtonLoading(true));
    try {
      await createData(api.settingsApi.addProduct, data);

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
