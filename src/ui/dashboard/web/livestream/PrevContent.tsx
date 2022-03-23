import React, { useEffect, useState } from "react";
import LiveStreamMDItem from "../../../../components/livestream-item/livestream-md-item";
import { loadPreviousLiveStreamWeb } from "../../../../controller/livestream.controller";
import { LiveStreamDTO } from "../../../../dto/LiveStream.dto";
import { getParam } from "../../../../utils";

export default function PreviousLiveStreamContent() {
  const liveStreamItems: LiveStreamDTO[] = [];
  const [items, setItems] = useState(liveStreamItems);

  useEffect(() => {
    const id = getParam("id");
    if (!id) {
      // router.push("/web/";
    } else {
    }
    loadPreviousLiveStreamWeb(setItems);
  }, []);
  return (
    <>
      <hr />
      <div className="sectionTwo">
        <div className="header">
          <h3>Previous sundays</h3>
          <form action="">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search by Sermon" />
          </form>
        </div>
        <div className="row prevSundays">
          {items.length > 0
            ? items.map((x, index) => {
                return (
                  <LiveStreamMDItem
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
          {/* <div className="column one">
            <div className="row">
              <div className="vid">
                <video src="/videos/vlc_record_2021_10_02.mp4"></video>
              </div>
              <div className="column">
                <div className="title">Healing Sunday</div>
                <div className="preacher">Pastor Ken</div>
                <div className="date">20th Sept. 2021</div>
                <div className="views">140.2k <span>Views</span></div>
              </div>
            </div>
          </div>
          <div className="column one">
            <div className="row">
              <div className="vid">
                <video src="/videos/vlc_record_2021_10_02.mp4"></video>
              </div>
              <div className="column">
                <div className="title">Healing Sunday</div>
                <div className="preacher">Pastor Ken</div>
                <div className="date">20th Sept. 2021</div>
                <div className="views">140.2k <span>Views</span></div>
              </div>
            </div>
          </div>
          <div className="column one">
            <div className="row">
              <div className="vid">
                <video src="/videos/vlc_record_2021_10_02.mp4"></video>
              </div>
              <div className="column">
                <div className="title">Healing Sunday</div>
                <div className="preacher">Pastor Ken</div>
                <div className="date">20th Sept. 2021</div>
                <div className="views">140.2k <span>Views</span></div>
              </div>
            </div>
          </div>
          <div className="column one">
            <div className="row">
              <div className="vid">
                <video src="/videos/vlc_record_2021_10_02.mp4"></video>
              </div>
              <div className="column">
                <div className="title">Healing Sunday</div>
                <div className="preacher">Pastor Ken</div>
                <div className="date">20th Sept. 2021</div>
                <div className="views">140.2k <span>Views</span></div>
              </div>
            </div>
          </div> */}
          <button className="button">See More</button>
        </div>
        <div className="copyright">Kingdom Ways Living Church 2021</div>
      </div>
    </>
  );
}
