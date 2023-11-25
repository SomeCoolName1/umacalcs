import "./guideSkills.scss";
import recBg from "../../../assets/champions_bg_2.png";
import DisplaySkill from "../getSkills";
import DisplayInherit from "../getInherit";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const GuideSkills = ({ strategies, cardRarity, skillSetData, skillsData }) => {
  //----------------------Title Framer Motion
  const titleRef = useRef(null);
  const titleControls = useAnimation();
  const isTitleInView = useInView(titleRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });
  const titleVariants = {
    hidden: { clipPath: `polygon(100% -200%, 100% 200%, 100% 0%, 100% 0%)` },
    visible: {
      visibility: "visible",
      clipPath: `polygon(100% -200%, 100% 200%, 0% 200%, 0% -200%)`,
    },
  };
  const titleTransition = {
    duration: 1.3,
    ease: [0.075, 0.82, 0.165, 1],
    // delay: 0.5,
  };

  //----------------------Content Framer Motion

  const contentRef = useRef(null);
  const contentControls = useAnimation();
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

  useEffect(() => {
    if (isContentInView) {
      contentControls.start("visible");
    }
    if (isTitleInView) {
      console.log("hi");
      titleControls.start("visible");
    }
  }, [isContentInView, isTitleInView]);

  return (
    <div className="CMGuide-skills-container" ref={titleRef}>
      <motion.div
        className="CMGuide-skills-picture"
        variants={titleVariants}
        initial="hidden"
        animate={titleControls}
        transition={titleTransition}
      >
        <img src={recBg} alt="background" />
      </motion.div>
      <motion.div
        className="CMGuide-skills-title"
        variants={titleVariants}
        initial="hidden"
        animate={titleControls}
        transition={titleTransition}
      >
        <div className="CMGuide-skills-seperator" />
        <h3>Recommended Skills</h3>
      </motion.div>
      <motion.div
        className="CMGuide-rec-skills-container"
        variants={contentVariants}
        initial="hidden"
        animate={contentControls}
        transition={contentTransition}
        ref={contentRef}
      >
        {strategies.map((strategy) => (
          <div
            className={`CMGuide-skills-${strategy.name} CMGuide-skills-strategy-container`}
          >
            <div
              className={`CMGuide-skills-${strategy.name}-title CMGuide-skills-strategy-title`}
            >
              <h3>{strategy.name}</h3>
            </div>
            <h3>Inherits</h3>
            <div
              className={`CMGuide-skills-${strategy.name}-inherit CMGuide-skills-rec-list`}
            >
              {strategy.inherit.length === 0 ? "None" : ""}
              {strategy.inherit.map((uma) => {
                return DisplayInherit(
                  uma,
                  cardRarity,
                  skillSetData,
                  skillsData
                );
              })}
            </div>
            <div
              className={`CMGuide-skills-rec-${strategy.name}-inherit-comment CMGuide-skills-rec-comment`}
            >
              {strategy.inhComm &&
                strategy.inhComm.map((comment) => <p>* {comment}</p>)}
            </div>
            <h3>Skills</h3>
            <div
              className={`CMGuide-skills-${strategy.name}-skills CMGuide-skills-rec-list`}
            >
              {strategy.recommended.map((skill) => (
                <DisplaySkill skill={skill} data={skillsData} />
              ))}
            </div>
            <div className={`CM-skills-${strategy.name}-unique-comment`}></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GuideSkills;
