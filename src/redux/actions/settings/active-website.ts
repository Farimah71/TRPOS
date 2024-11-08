import { AxiosResponse } from "axios";
import {
  setActiveWebsiteInfo,
  setActiveWebsiteLoading,
} from "../../reducers/settings/active-websites";
import { AppDispatch } from "../../store/store";
import { createData } from "../../../core/http-service";
import { api } from "../../../api";

export const getAllActiveWebsites =
  (data: { pageNumber: number; pageSize: number }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setActiveWebsiteLoading(true));
    try {
      const response: AxiosResponse = await createData(
        api.settingsApi.getAllActiveWebsites,
        data
      );

      response && dispatch(setActiveWebsiteInfo(response.data));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setActiveWebsiteLoading(false));
    }
  };
