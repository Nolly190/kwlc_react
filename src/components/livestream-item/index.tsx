import moment from "moment";
import { FC } from "react";
import YouTube from "react-youtube";

export interface SingleLiveStreamItem {
  preacher: string;
  datetime: string;
  videoUrl: string;
  title: string;
  id: number;
  views: number;
  onEnd: Function;
  onError: Function;
}

const LiveStreamItem: FC<SingleLiveStreamItem> = (
  data: SingleLiveStreamItem
) => {
  const { datetime, id, preacher, title, videoUrl } = data;
  const readDatetime = moment(datetime).format("DD MMM. yyyy");
  return (
    <div className="row mb-3" style={{ marginBottom: "2rem" }}>
      <div className="column first">
        <YouTube
          className={"vid thumbnail-iframe"}
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
      <div className="column second" style={{ paddingLeft: "2rem" }}>
        <div className="title">{title}</div>
        {/* <div className="preacher">{preacher}</div> */}
        <div className="date">{readDatetime}</div>
      </div>
    </div>
  );
};

export default LiveStreamItem;
