import { useEffect, useState } from "react";
import {
  fetchSkills,
  fetchCardRarityData,
  fetchSkillSet,
  fetchSupportCard,
} from "../CMGuide/data/fetchData";
import DisplayInherit from "../CMGuide/getInherit";
import DisplaySkill from "../CMGuide/getSkills";
import "./CMMain.scss";
import TrackInfo from "../CMGuide/getTrack";
import { nigeSkills } from "../CMGuide/data/nigeSkills";
import ayabeOndo1 from "../../assets/cmimages/ayabe_tracenondo_1.jpg";
import ayabeOndo2 from "../../assets/cmimages/ayabe_tracenondo_2.jpg";
import ayabeOndo3 from "../../assets/cmimages/ayabe_tracenondo_3.jpg";
import ayabeOndo4 from "../../assets/cmimages/ayabe_tracenondo_4.jpg";
import { senkouSkills } from "../CMGuide/data/senkouSkills";
import { sashiSkills } from "../CMGuide/data/sashiSkills";
import { oikomiSkills } from "../CMGuide/data/oikomiSkills";
import { zenSkills } from "../CMGuide/data/zenSkills";

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
  }, []);

  const trackInfo = [
    {
      name: "RaceTrack",
      detail: "Nakayama Inside Track (京都レース場)",
      keyWord: "中山レース場○",
    },
    { name: "Distance", detail: "2500m", keyWord: "非根幹距離○" },
    { name: "Season", detail: "Winter", keyWord: "冬ウマ娘○" },
    { name: "Turn", detail: "右回り - Clockwise", keyWord: "右回り○" },
    { name: "Ground", detail: "Heavy Weather", keyWord: "道悪○" },
  ];

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
      name: "Runner",
      recommended: reqRunner,
      inherit: inhRunner,
      inhComm: inhRunComs,
    },
    {
      name: "Leader",
      recommended: reqLeader,
      inherit: inhLeader,
      inhComm: inhLeaComs,
    },
    {
      name: "Betweener",
      recommended: reqBetweener,
      inherit: inhBetweener,
      inhComm: inhBetComs,
    },
    {
      name: "Chaser",
      recommended: reqChaser,
      inherit: inhChaser,
      inhComm: inhChaComs,
    },
  ];

  return (
    <div className="CMGuide-main-container">
      <div className="CMGuide-picture-container">
        <div className="ayabe-banner">
          <img src={ayabeOndo1} />
          <img src={ayabeOndo2} />
          <img src={ayabeOndo3} />
          <img src={ayabeOndo4} />
          <img src={ayabeOndo1} />
          <img src={ayabeOndo2} />
          <img src={ayabeOndo3} />
          <img src={ayabeOndo4} />
          <img src={ayabeOndo1} />
          <img src={ayabeOndo2} />
          <img src={ayabeOndo3} />
          <img src={ayabeOndo4} />
        </div>
      </div>
      <h1>League of Heroes track information</h1>
      <span className="rec-stats">
        <div>
          <h3>Recommended Stats:</h3>
          <p>
            1600 / 1200 (To live: 900-950-ish + 1 gold) / 1200 / 1200 / 1200
          </p>
        </div>
        <div>
          <h3>Stat Threshold:</h3>
          <p>Power</p>
        </div>
      </span>
      <div className="track-info-container">
        {trackInfo.map((info) => (
          <TrackInfo
            info={info}
            data={skillsData}
            supportCardsData={supportCardData}
          />
        ))}
      </div>

      <div className="rec-container">
        <h2>Recommended Skills/Inherits</h2>
        {strategies.map((strategy) => (
          <div className={`rec-skills-${strategy.name} rec-skills-container`}>
            <h3>{strategy.name}</h3>
            <h4>Inherits</h4>
            <div
              className={`rec-skills-${strategy.name}-inherit rec-skills-list`}
            >
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
              className={`rec-skills-${strategy.name}-inherit-comment rec-skills-comment`}
            >
              *{strategy.inhComm}
            </div>
            <div className="rec-divider" />
            <h4>Skills</h4>
            <div
              className={`rec-skills-${strategy.name}-skills rec-skills-list`}
            >
              {strategy.recommended.map((skill) => (
                <DisplaySkill skill={skill} data={skillsData} />
              ))}
            </div>
            <div className={`rec-skills-${strategy.name}-unique-comment`}></div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMMain;
