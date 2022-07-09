import moment from "moment";
import { FC } from "react";
import YouTube from "react-youtube";
import { SingleLiveStreamItem } from ".";

const LiveStreamMDItem: FC<SingleLiveStreamItem> = (
  data: SingleLiveStreamItem
) => {
  const { datetime, id, preacher, title, videoUrl, views } = data;
  const readDatetime = moment(datetime).format("DD MMM. yyyy");

  return (
    <div className="column one">
      <div className="row">
        <div className="vid">
          {/* <video src={videoUrl}></video> */}

          <YouTube
            // className={'vid'}
            className="previous-stream-thumbnail"
            videoId={videoUrl.split("=")[1]} // defaults -> null https://www.youtube.com/watch?v=
            title={title} // defaults -> null
            onEnd={() => {
              console.log("ended");
            }} // defaults -> noop
            onError={(args) => {
              data.onEnd && data.onEnd(args);
            }} // defaults -> noop
            onStateChange={(args) => {
              data.onError && data.onError(args);
            }} // defaults -> noop
          />
        </div>
        <div className="column">
          <div className="title">{title}</div>
          {preacher && <div className="preacher">{preacher}</div>}

          <div className="date">{readDatetime}</div>
          {/* {views && <div className="views">{views}k <span>Views</span></div>} */}
        </div>
      </div>
    </div>
  );
};
export default LiveStreamMDItem;
