import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setMotivation,
  setProfDistance,
  setProfStrategy,
  setProfSurface,
  setStrategy,
} from "../state/userSlice";
import Calculations from "./forminputs/calculations";
import happyAyabe from "../HappyAyabe.png";
import "./main.scss";
import Collapsible from "react-collapsible";

const initialStats = {
  speed: { en: "speed", jp: "スペード", value: 1000 },
  stamina: { en: "stamina", jp: "スタミナ", value: 1000 },
  power: { en: "power", jp: "パワー", value: 1000 },
  guts: { en: "guts", jp: "根性", value: 1000 },
  int: { en: "int", jp: "賢さ", value: 1000 },
};

const Main = () => {
  const dispatch = useDispatch();

  const [umaStats, setUmaStats] = useState(initialStats);
  const aptitudeTypes = [
    { en: "surface", jp: "バ場適性" },
    { en: "distance", jp: "距離適性" },
    { en: "strategy", jp: "脚質適性" },
  ];

  const handleStatChange = (e, targetStat) => {
    let convertNumber = parseInt(e.target.value);

    if (isNaN(convertNumber)) {
      convertNumber = 0;
    }

    setUmaStats((prev) => ({
      ...prev,
      [targetStat]: { ...prev[targetStat], value: convertNumber },
    }));
  };

  const updateUmaStratMot = (e, type) => {
    if (type === "strategy") {
      dispatch(setStrategy({ strategy: e.target.value }));
    } else if (type === "motivation") {
      dispatch(setMotivation({ mood: e.target.value }));
    } else return;
  };

  const updateUmaProf = (e, type) => {
    switch (type) {
      case "surface":
        dispatch(setProfSurface({ surface: e.target.value }));
        break;
      case "distance":
        dispatch(setProfDistance({ distance: e.target.value }));
        break;
      case "strategy":
        dispatch(setProfStrategy({ strategy: e.target.value }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="main-container">
      <div className="title-block-container">
        <img src={happyAyabe} alt="happy-ayabe" />
      </div>
      <div className="uma-details-container">
        <Collapsible trigger={<h1>UMA Details</h1>}>
          <div className="uma-stats-container stats-container">
            {Object.values(umaStats).map((stat) => {
              return (
                <div className="uma-stat">
                  <label for={`uma-${stat.en}`} className="label uma-label">
                    <span className="jp-label">{stat.jp}</span>
                    <span className="en-label">{stat.en}</span>
                  </label>
                  <input
                    className="uma-stat-aptitude"
                    type="text"
                    name={stat.en}
                    value={stat.value}
                    maxLength="4"
                    pattern="\d*"
                    onChange={(e) => handleStatChange(e, stat.en)}
                  />
                </div>
              );
            })}
          </div>
          <div className="uma-aptitude-container">
            <div className="uma-aptitude">
              <label for="uma-strategy" className="uma-label label">
                <span className="jp-label">作戦</span>
                <span className="en-label">Tactic</span>
              </label>
              <select
                name="uma-strategy"
                className="uma-select"
                onChange={(e) => updateUmaStratMot(e, "strategy")}
              >
                <option value="great escape">大逃げ</option>
                <option value="runner" selected>
                  逃げ
                </option>
                <option value="leader">先行</option>
                <option value="betweener">差し</option>
                <option value="chaser">追込</option>
              </select>
            </div>
            {aptitudeTypes.map((aptitude) => {
              return (
                <div className="uma-aptitude">
                  <label for="uma-surface" className="uma-label label">
                    <span className="jp-label">{aptitude.jp}</span>
                    <span className="en-label">{aptitude.en}</span>
                  </label>
                  <select
                    name={`uma-${aptitude.en}`}
                    className="uma-select"
                    onChange={(e) => updateUmaProf(e, aptitude.en)}
                  >
                    <option value="S">S</option>
                    <option value="A" selected>
                      A
                    </option>
                    <option value="B">B</option>
                  </select>
                </div>
              );
            })}
            <div
              className="uma-aptitude"
              onChange={(e) => updateUmaStratMot(e, "motivation")}
            >
              <label for="uma-motivation" className="uma-label label">
                <span className="jp-label">調子</span>
                <span className="en-label">Mood</span>
              </label>
              <select name="uma-motivation" className="uma-select">
                <option value="絶好調">絶好調</option>
                <option value="好調">好調</option>
                <option value="普通" selected>
                  普通
                </option>
                <option value="不調">不調</option>
                <option value="絶不調">絶不調</option>
              </select>
            </div>
          </div>
        </Collapsible>
      </div>

      <Calculations stats={umaStats} />
    </div>
  );
};

export default Main;
