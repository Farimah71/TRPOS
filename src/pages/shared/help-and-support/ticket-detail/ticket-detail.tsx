import { useLocation, useParams } from "react-router-dom";
import { Button } from "../../../../components/button";
import {
  IconCheckCircleRed,
  IconSendMessage,
} from "../../../../components/icons/icons";
import { Messenger } from "../../../../components/messenger";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import {
  getTaskDetail,
  replyAdd,
  ticketClosed,
} from "../../../../redux/actions/helpAndSupport/task-detail";
import { TopLoader } from "../../../../components/top-loader";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MessengerFileUploader } from "../../../../components/messenger-uploader";
import * as yup from "yup";

interface ReplyAdd {
  TaskItemId: number;
  ForwarderDescription: string;
  File?: FileList;
}

const TicketDetails = () => {
  const [messages, setMessages] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isRed, setIsRed] = useState(false);

  const { info: taskDetailInfo, error: taskError } = useAppSelector(
    (state) => state.taskDetailSlice
  );
  const { loading: isTaskLoading } = useAppSelector((state) => state.taskSlice);
  const { isContentLoading } = useAppSelector(
    (state) => state.contentLoadingSlice
  );
  const { isButtonLoading } = useAppSelector(
    (state) => state.buttonLoadingSlice
  );

  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  const validateSchema = yup.object().shape({
    TaskItemId: yup.number().required(),
    ForwarderDescription: yup.string().min(5).required(),
    File: yup.mixed<FileList>(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<ReplyAdd>({
    defaultValues: { TaskItemId: state.taskMainId },
    resolver: yupResolver(validateSchema),
    mode: "all",
  });

  useEffect(() => {
    trigger();
  }, [trigger]);
  useEffect(() => {
    dispatch(
      getTaskDetail({
        pageNumber: 0,
        pageSize: 0,
        id: id,
        referanceToken: state.token,
      })
    );
  }, []);
  useEffect(() => {
    reset();
    dispatch(
      getTaskDetail({
        pageNumber: 0,
        pageSize: 0,
        id: id,
        referanceToken: state.token,
      })
    );
  }, [shouldReload]);
  useEffect(() => {
    if (taskDetailInfo) {
      setMessages(taskDetailInfo.taskResponsive);
    }
  }, [taskDetailInfo]);
  useEffect(() => {
    taskError.length && setIsRed(true);
    const timer = setTimeout(() => {
      setIsRed(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [taskError]);

  const onSubmit: SubmitHandler<ReplyAdd> = (data) => {
    dispatch(
      replyAdd(data, () => setShouldReload((shouldReload) => !shouldReload))
    );
  };

  return (
    <>
      {isContentLoading && <TopLoader />}
      <div className="outlet w-full h-full pe-8 mt-4 pb-8">
        <div className="w-full h-auto bg-actual-white rounded-2.5xl p-6">
          <div className="w-full h-full flex flex-col mb-7">
            <div className="w-full flex justify-between items-center">
              <div>
                <p className="text-xs text-base-content-40 mb-2">Detaylar</p>
                <h1 className="text-[20px] text-base-content font-semibold">
                  {taskDetailInfo?.taskMain?.taskItems[0]?.description}
                </h1>
              </div>
              <div className="flex items-center gap-6">
                <Button
                  variant="error"
                  className="!text-error"
                  isInTop
                  isLight
                  isLoading={isTaskLoading}
                  onClick={() =>
                    dispatch(
                      ticketClosed({ id: id }, () =>
                        setShouldReload((shouldReload) => !shouldReload)
                      )
                    )
                  }
                  disabled={taskDetailInfo?.taskMain?.isComplete}
                >
                  <IconCheckCircleRed
                    width={24}
                    hanging={24}
                    viewBox="0 0 24 24"
                  />
                  {taskDetailInfo?.taskMain?.isComplete
                    ? taskDetailInfo?.taskMain?.completeDateTime.slice(0, 10) +
                      " tarihinde kapatıldı"
                    : "Talebi Sonlandır"}
                </Button>
              </div>
            </div>
          </div>
          <hr />
          <Messenger yourMessageList={messages} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between rounded-full mt-5 bg-actual-white h-16 p-1">
            <div className="w-full flex mt-4 ml-5">
              <MessengerFileUploader
                id="file"
                register={{
                  ...register("File", {
                    onChange: (e) => {
                      setFileName(e.target.files[0].name!);
                    },
                  }),
                }}
                fileName={fileName}
                disabled={taskDetailInfo?.taskMain?.isComplete}
              />
              <span className="after:border-r-2 after:h-10 ml-5"></span>
              <input
                {...register("ForwarderDescription")}
                placeholder={
                  taskDetailInfo?.taskMain?.isComplete
                    ? "Artık mesaj gönderemezsiniz."
                    : "Yaz..."
                }
                className="w-full outline-none mx-5 disabled:bg-transparent disabled:placeholder:text-gray-300 -mt-3 text-sm font-medium placeholder:text-base-content"
                disabled={taskDetailInfo?.taskMain?.isComplete}
              />
            </div>
            <Button
              isLight
              isInTop
              type="submit"
              variant={isRed ? "error" : "primary"}
              className={`${
                isRed ? "!text-error" : "!text-primary"
              }  !rounded-full`}
              isLoading={isButtonLoading}
              isDisabled={
                Object.keys(errors).length > 0 ||
                taskDetailInfo?.taskMain?.isComplete
                  ? true
                  : false
              }
            >
              <IconSendMessage width={20} />
              Gönder
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TicketDetails;
