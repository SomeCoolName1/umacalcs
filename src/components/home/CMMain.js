import { useEffect, useState, useRef } from "react";
import {
  fetchSkills,
  fetchCardRarityData,
  fetchSkillSet,
  fetchSupportCard,
} from "../CMGuide/data/fetchData";
import "./CMMain.scss";
import { nigeSkills } from "../CMGuide/data/nigeSkills";
import { senkouSkills } from "../CMGuide/data/senkouSkills";
import { sashiSkills } from "../CMGuide/data/sashiSkills";
import { oikomiSkills } from "../CMGuide/data/oikomiSkills";
import { zenSkills } from "../CMGuide/data/zenSkills";
import championBg from "../../assets/champions_bg.png";
import raceCourseLogo from "../../assets/race_course_logo.png";
import GuideTrack from "../CMGuide/guidesections/guideTrack";
import GuideSkills from "../CMGuide/guidesections/guideSkills";
import Loading from "./loading/loading";
import { trackTitle, trackInfo } from "../CMGuide/data/trackData";

const CMMain = () => {
  let [skillsData, setSkills] = useState(false);
  let [cardRarity, setCardRarity] = useState(false);
  let [skillSetData, setSkillSet] = useState(false);
  let [supportCardData, setSupportCard] = useState(false);

  const getSkillsData = async () => {
    setSkills(await fetchSkills());
    setCardRarity(await fetchCardRarityData());
    setSkillSet(await fetchSkillSet());
    setSupportCard(await fetchSupportCard());
  };

  useEffect(() => {
    getSkillsData();
    let s = new Date().toLocaleString();
  }, []);

  const {
    inherit: inhEveryone,
    recc: reqEveryone,
    nonInherit: inhNoone,
    nonRecc: reqNoone,
  } = zenSkills;
  const {
    inherit: inhRunner,
    inheritComments: inhRunComs,
    recc: reqRunner,
  } = nigeSkills;
  const {
    inherit: inhLeader,
    inheritComments: inhLeaComs,
    recc: reqLeader,
  } = senkouSkills;
  const {
    inherit: inhBetweener,
    inheritComments: inhBetComs,
    recc: reqBetweener,
  } = sashiSkills;
  const {
    inherit: inhChaser,
    inheritComments: inhChaComs,
    recc: reqChaser,
  } = oikomiSkills;

  const strategies = [
    {
      name: "Everyone",
      recommended: reqEveryone,
      inherit: inhEveryone,
    },
    {
      name: "Ill-Advised",
      recommended: reqNoone,
      inherit: inhNoone,
    },
    {
      name: "Runner - 逃げ",
      recommended: reqRunner,
      inherit: inhRunner,
      inhComm: inhRunComs,
    },
    {
      name: "Leader - 先行",
      recommended: reqLeader,
      inherit: inhLeader,
      inhComm: inhLeaComs,
    },
    {
      name: "Betweener - 差し",
      recommended: reqBetweener,
      inherit: inhBetweener,
      inhComm: inhBetComs,
    },
    {
      name: "Chaser - 追込",
      recommended: reqChaser,
      inherit: inhChaser,
      inhComm: inhChaComs,
    },
  ];

  return (
    <div className={`CMGuide-main-container`}>
      <div className="CMGuide-picture-container">
        <div className="CMGuide-picture">
          <img src={championBg} />
        </div>
        <div className="CMGuide-title">
          <img src={raceCourseLogo} />
        </div>
        <div className="CMGuide-overview">
          <p className="CMGuide-overview-title">{trackTitle.name}</p>
          <p>開催予定時期</p>
          <p>{trackTitle.date}</p>
          <p>対象レース</p>
          <p>{trackTitle.details}</p>
        </div>
      </div>
      <GuideTrack
        trackInfo={trackInfo}
        data={skillsData}
        supportCardsData={supportCardData}
      />
      <GuideSkills
        strategies={strategies}
        cardRarity={cardRarity}
        skillSetData={skillSetData}
        skillsData={skillsData}
      />
    </div>
  );
};

export default CMMain;
