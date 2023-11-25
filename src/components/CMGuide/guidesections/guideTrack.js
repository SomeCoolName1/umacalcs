import "./guideTrack.scss";
import trackBg from "../../../assets/champions_bg_1.png";
import { useRef, useState } from "react";
import TrackInfo from "../getTrack";

const GuideTrack = ({ trackInfo, data, supportCardsData }) => {
  const [show, setShow] = useState("false");
  const trackPopup = useRef(null);

  const closePopup = (e) => {
    if (trackPopup.current && show && !trackPopup.current.contains(e.target)) {
      setShow(false);
    }
  };

  document.addEventListener("mousedown", closePopup);

  return (
    <div className="CMGuide-track-container">
      <div className={`CMGuide-track-overlay CMGuide-track-overlay-${show}`} />
      <div className="CMGuide-track-picture">
        <img src={trackBg} alt="track" />
      </div>
      <div className="CMGuide-track-title">
        <div className="CMGuide-track-seperator" />
        <h3>Track Info</h3>
      </div>
      <div className="CMGuide-track-info-container">
        <div className="CMGuide-track-header-container ">
          <div className="CMGuide-track-rec-stats CMGuide-track-header CMGuide-track-info">
            <h3>Recommended Stat</h3>
            <p>
              1600 / 1200 (To live: 900-950-ish + 1 gold) / 1200 / 1000 / 1200
            </p>
          </div>
          <div
            className={`CMGuide-track-course-container CMGuide-track-header`}
            onClick={() => setShow((prev) => !prev)}
            ref={trackPopup}
          >
            <h3>Show Course</h3>
            <img
              className={`CMGuide-course-${show}`}
              src="https://cdn.discordapp.com/attachments/924875144260882474/1173569353560621076/image.png?ex=656da921&is=655b3421&hm=f268fafdf05c7064e9466671c4aebfbda0518db46060d6f4c38f396349cd65af&"
              alt="course breakdown"
            />
          </div>
          <div className="CMGuide-track-threshold CMGuide-track-info CMGuide-track-header">
            <h3>Stat Threshold</h3>
            <p>Power</p>
          </div>
        </div>
        <div className="CMGuide-track-skills-container">
          {trackInfo.map((info) => (
            <TrackInfo
              info={info}
              data={data}
              supportCardsData={supportCardsData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideTrack;
