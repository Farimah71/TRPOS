import { api } from "../../../api";
import { createData } from "../../../core/http-service";
import { setButtonLoading } from "../../reducers/button-loading";
import { setContentLoading } from "../../reducers/content-loading";
import { setTaskLoading } from "../../reducers/helpAndSupport/task";
import {
  setTaskDetailError,
  setTaskDetails,
} from "../../reducers/helpAndSupport/task-detail";
import { AppDispatch } from "../../store/store";

export const getTaskDetail = (data: {}) => async (dispatch: AppDispatch) => {
  dispatch(setContentLoading(true));
  try {
    const response: any = await createData(api.settingsApi.taskDetail, data);
    dispatch(setTaskDetails(response.data));
  } catch (error: any) {
    console.log(error);
  } finally {
    dispatch(setContentLoading(false));
  }
};

export const replyAdd =
  (data: {}, setState: () => void) => async (dispatch: AppDispatch) => {
    dispatch(setButtonLoading(true));
    try {
      const response = await createData(
        api.settingsApi.taskReplyAdd,
        data,
        undefined,
        true
      );

      response && setState();
    } catch (error: any) {
      console.log(error);
      dispatch(setTaskDetailError(error.message));
    } finally {
      dispatch(setButtonLoading(false));
    }
  };

export const ticketClosed =
  (data: {}, setState: () => void) => async (dispatch: AppDispatch) => {
    dispatch(setTaskLoading(true));
    try {
      const response = await createData(api.settingsApi.ticketClosed, data);
      response && setState();
    } catch (error: any) {
      console.log(error);
      dispatch(setTaskDetailError(error.message));
    } finally {
      dispatch(setTaskLoading(false));
    }
  };
