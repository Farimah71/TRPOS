// import { ContentLoading } from "../content-loading";
import { MessengerProps } from "./messenger.types";
import InfiniteScroll from "react-infinite-scroller";

export const Messenger: React.FC<MessengerProps> = ({ yourMessageList }) => {
  return (
    <div className={`py-5 overflow-y-scroll h-[60vh] pe-3`}>
      <InfiniteScroll
        pageStart={1}
        loadMore={() => console.log("load more")}
        hasMore={true || false}
        // loader={
        //   <div className="py-5 loader" key={0}>
        //     <ContentLoading />
        //   </div>
        // }
        useWindow={false}
        isReverse
      >
        <div
          className={`flex flex-col gap-y-5 duration-1000 ${
            yourMessageList?.length == 0
              ? "opacity-0"
              : "opacity-100 transition-opacity"
          }`}
        >
          {yourMessageList?.length > 0 &&
            yourMessageList.map((answerMsg) => (
              <p
                key={answerMsg.id}
                className={`flex flex-col gap-y-3 w-1/2 ml-auto`}
                // ${
                //   answerMsg.isAdmin === "true" && "ml-auto"
                //   }
              >
                <span className="text-base-content-60 text-sm">
                  {/* {JSON.parse(answerMsg.acceptorInfo).UserTitle} */}
                  Sen
                </span>
                <span
                  className={`p-4 rounded-2xl font-medium text-sm bg-primary text-white`}
                  // ${
                  //   answerMsg.isAdmin === "true"
                  //     ? "bg-primary text-white"
                  //     : "bg-base-content-3"
                  //   }
                >
                  {answerMsg.forwarderDescription}
                  <div
                    className={`text-xs mt-3 font-light ${
                      answerMsg.isAdmin === "false" && "text-base-content-60"
                    }`}
                  >
                    {answerMsg.creationDate.slice(0, 10)} -{" "}
                    {answerMsg.creationDate.slice(11, 16)}
                  </div>
                </span>
              </p>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
