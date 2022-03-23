import React, { useEffect, useState } from "react";
import LiveStreamItem from "../../../../components/livestream-item";
import { loadLiveStreamWeb } from "../../../../controller/livestream.controller";
import { LiveStreamDTO } from "../../../../dto/LiveStream.dto";
import { getParam } from "../../../../utils";
import YouTube from "react-youtube";

export default function LiveStreamContent() {
  const liveStreamItems: LiveStreamDTO[] = [];

  const [item, setItem] = useState(new LiveStreamDTO());
  const [items, setItems] = useState([]);

  useEffect(() => {
    const id = getParam("id");
    if (!id) {
      // router.push("/web/";
    } else {
    }
    loadLiveStreamWeb(setItems, setItem);
  }, []);

  return (
    <>
      <div className="livStream">
        <div className="row">
          <div className="column left">
            <h3>Stream</h3>
            {/*                 <video width="100%" height="auto" controls>
                  <source src={item.liveStreamUrl} type="video/mp4" />
                </video>
                
                <div className="lieViews">
                    <div className="text">Live</div>
                    <i className="fas fa-eye"></i>
                    <div className="amount">{item.views}k</div>
                </div> */}
            <YouTube
              videoId={item.liveStreamUrl} // defaults -> null
              id={item.id?.toString()} // defaults -> null
              title={item.title} // defaults -> null
              onEnd={() => {
                console.log("ended");
              }} // defaults -> noop
              onError={() => {
                console.log("error");
              }} // defaults -> noop
              onStateChange={(d) => {
                console.log("state changed", d);
              }} // defaults -> noop
            />
            <div className="aboutService">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
          <div className="column right">
            <h3>Previous sundays</h3>
            <div className="previousSundays">
              {items.length > 0
                ? items.map((x, index) => {
                    return (
                      <LiveStreamItem
                        key={index}
                        datetime={x.dateOfStream}
                        id={x.id}
                        preacher={x.preacher}
                        title={x.title}
                        videoUrl={x.liveStreamUrl}
                        views={x.views}
                        onEnd={() => {}}
                        onError={() => {}}
                      />
                    );
                  })
                : undefined}
            </div>
            <div className="share" style={{ marginTop: "3rem" }}>
              <div className="text">Share this on all social media page</div>
              <button className="button">Share</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
