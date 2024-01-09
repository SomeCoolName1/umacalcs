import "./guideTrack.scss";
import trackBg from "../../../assets/champions_bg_1.png";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import TrackInfo from "../getTrack";

const GuideTrack = ({ trackInfo, data, supportCardsData }) => {
  const [show, setShow] = useState("false");
  const trackPopup = useRef(null);

  //----------------------Title Framer Motion
  const titleRef = useRef(null);
  const titleControls = useAnimation();
  const isTitleInView = useInView(titleRef, {
    margin: "0px 0px -50px 0px",
    once: true,
  });
  const titleVariants = {
    hidden: { clipPath: `polygon(0% -200%, 0% 200%, 0% 0%, 0% 0%)` },
    visible: {
      visibility: "visible",
      clipPath: `polygon(0% -200%, 0% 200%, 100% 200%, 100% -200%)`,
    },
  };
  const titleTransition = {
    duration: 1.3,
    ease: [0.075, 0.82, 0.165, 1],
    delay: 0.5,
  };

  //----------------------Content Framer Motion

  const contentRef = useRef(null);
  const contentControls = useAnimation();
  //top, right, bottom, left
  const isContentInView = useInView(contentRef, {
    margin: "0px 0px -500px 0px",
    once: true,
  });
  const contentVariants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };
  const contentTransition = {
    type: "spring",
    stiffness: 250,
    delay: 0.2,
  };

  //------------------------------------

  const closePopup = (e) => {
    if (trackPopup.current && show && !trackPopup.current.contains(e.target)) {
      setShow(false);
    }
  };
  document.addEventListener("mousedown", closePopup);

  useEffect(() => {
    if (isContentInView) {
      contentControls.start("visible");
    }
    if (isTitleInView) {
      titleControls.start("visible");
    }
  }, [isContentInView, isTitleInView]);

  return (
    <div className="CMGuide-track-container">
      <div className={`CMGuide-track-overlay CMGuide-track-overlay-${show}`} />
      <motion.div
        className="CMGuide-track-picture"
        variants={titleVariants}
        initial="hidden"
        animate={titleControls}
        transition={titleTransition}
        ref={titleRef}
      >
        <img src={trackBg} alt="track" />
      </motion.div>
      <motion.div
        className="CMGuide-track-title"
        variants={titleVariants}
        initial="hidden"
        animate={titleControls}
        transition={titleTransition}
        ref={titleRef}
      >
        <div className="CMGuide-track-seperator" />
        <h3>Track Info</h3>
      </motion.div>
      <motion.div
        className="CMGuide-track-info-container"
        variants={contentVariants}
        transition={contentTransition}
        initial="hidden"
        animate={contentControls}
        ref={contentRef}
      >
        <div className="CMGuide-track-header-container">
          <div className="CMGuide-track-rec-stats CMGuide-track-header CMGuide-track-info">
            <h3>Recommended Stat</h3>
            <p>1600 / 400 / 1200 / 1200 / 1200</p>
          </div>
          <div
            className={`CMGuide-track-course-container CMGuide-track-header`}
            onClick={() => setShow((prev) => !prev)}
            ref={trackPopup}
          >
            <h3>Show Course</h3>
            <img
              className={`CMGuide-course-${show}`}
              src="https://cdn.discordapp.com/attachments/924875144260882474/1189811842567114760/image.png?ex=65a8c020&is=65964b20&hm=3923926f5ed92c82b36bb5dbfe77342eb97f39daa71fbcafb6682f47c0e6852b&"
              alt="course breakdown"
            />
          </div>
          <div className="CMGuide-track-threshold CMGuide-track-info CMGuide-track-header">
            <h3>Stat Threshold</h3>
            <p>None</p>
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
      </motion.div>
    </div>
  );
};

export default GuideTrack;
