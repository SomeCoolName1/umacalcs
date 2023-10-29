import { useEffect, useState } from "react";
import {
  fetchCardRarityData,
  fetchSkillSet,
  fetchSkills,
  fetchSupportCard,
} from "../CMGuide/data/fetchData";
import DisplayInherit from "../CMGuide/getInherit";
import DisplaySkill from "../CMGuide/getSkills";
import "./CMMain.scss";
import TrackInfo from "../CMGuide/getTrack";
import { useNavigate } from "react-router-dom";

const CMMain = () => {
  let [skillsData, setSkills] = useState(false);
  let [cardRarity, setCardRarity] = useState(false);
  let [skillSetData, setSkillSet] = useState(false);
  let [supportCardData, setSupportCard] = useState(false);

  const navigate = useNavigate();

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
      detail: "Kyoto Outside Track (京都レース場－外)",
      keyWord: "京都レース場○",
    },
    { name: "Distance", detail: "1600m", keyWord: "根幹距離○" },
    { name: "Turn", detail: "右回り - Clockwise", keyWord: "右回り○" },
    { name: "Ground", detail: "Random Weather", keyWord: "" },
  ];

  const reqEveryone = [
    {
      goldSkill: "ノンストップガール",
      goldEventCards: [30031, 30127, 30151],
      whiteEventCards: [""],
      comments: "Everyone except runners",
    },
  ];
  const reqRunner = [
    {
      goldSkill: "逃亡者",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
    {
      goldSkill: "ハイボルテージ",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
  ];
  const reqLeader = [
    {
      goldSkill: "ハイボルテージ",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
    {
      goldSkill: "鍔迫り合い",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
  ];
  const reqBetweener = [
    {
      goldSkill: "電光石火",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
    {
      goldSkill: "乗り換え上手",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
    {
      goldSkill: "豪脚",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
  ];
  const reqChaser = [
    {
      goldSkill: "電光石火",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
    {
      goldSkill: "抜群の切れ味",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
    {
      goldSkill: "豪脚",
      goldEventCards: [""],
      whiteEventCards: [""],
      comments: "",
    },
  ];
  const inhEveryone = [];
  const inhRunner = [{ id: 102001, enName: "Seuin Sky", comments: "" }];

  const inhLeader = [
    { id: 101001, enName: "Taiki Shuttle", comments: "" },
    { id: 105101, enName: "Nishino Flower", comments: "" },
  ];
  const inhBetweener = [
    { id: 102701, enName: "Mejiro Ryan", comments: "" },
    { id: 100101, enName: "Special Week", comments: "" },
  ];
  const inhChaser = [
    { id: 102701, enName: "Mejiro Ryan", comments: "" },
    { id: 100101, enName: "Special Week", comments: "" },
  ];

  const strategies = [
    { name: "Everyone", recommended: reqEveryone, inherit: inhEveryone },
    { name: "Runner", recommended: reqRunner, inherit: inhRunner },
    { name: "Leader", recommended: reqLeader, inherit: inhLeader },
    { name: "Betweener", recommended: reqBetweener, inherit: inhBetweener },
    { name: "Chaser", recommended: reqChaser, inherit: inhChaser },
  ];

  return (
    <div className="CMGuide-main-container">
      <div className="main-header">
        <div className="home-button-container" onClick={() => navigate("/")}>
          Home
        </div>
        <div
          className="CMGuide-button-container"
          onClick={() => navigate("/cm")}
        >
          CMGuide
        </div>
      </div>
      <h1>League of Heroes track information</h1>
      <span className="rec-stats">
        <div>
          <h3>Recommended Stats:</h3>
          <p>1600 / 700 / 1200 / 1200 / 1200</p>
        </div>
        <div>
          <h3>Stat Threshold:</h3>
          <p>SPEED</p>
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
            <h4>Skills</h4>
            <div
              className={`rec-skills-${strategy.name}-skills rec-skills-list`}
            >
              {strategy.recommended.map((skill) => {
                return DisplaySkill(skill, skillsData);
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMMain;
