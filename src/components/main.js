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
      dispatch(setMotivation({ motivation: e.target.value }));
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
        <h1>UMA Details</h1>
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
              <span className="en-label">Strategy</span>
            </label>
            <select
              name="uma-strategy"
              className="uma-select"
              onChange={(e) => updateUmaStratMot(e, "strategy")}
            >
              <option value="great escape">大逃げ</option>
              <option value="runner">逃げ</option>
              <option value="leader">先行</option>
              <option value="betweener">差し</option>
              <option value="chaser">追込</option>
            </select>
          </div>
          <div className="uma-aptitude">
            <label for="uma-surface" className="uma-label label">
              <span className="jp-label">バ場適性</span>
              <span className="en-label">Surface</span>
            </label>
            <select
              name="uma-surface"
              className="uma-select"
              onChange={(e) => updateUmaProf(e, "surface")}
            >
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          <div className="uma-aptitude">
            <label for="uma-distance" className="uma-label label">
              <span className="jp-label">距離適性</span>
              <span className="en-label">Distance</span>
            </label>
            <select
              name="uma-distance"
              className="uma-select"
              onChange={(e) => updateUmaProf(e, "distance")}
            >
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          <div className="uma-aptitude">
            <label for="uma-strategy-rank" className="uma-label label">
              <span className="jp-label">脚質適性</span>
              <span className="en-label">Strategy</span>
            </label>
            <select
              name="uma-strategy-rank"
              className="uma-select"
              onChange={(e) => updateUmaProf(e, "strategy")}
            >
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          <div
            className="uma-aptitude"
            onChange={(e) => updateUmaStratMot(e, "motivation")}
          >
            <label for="uma-motivation" className="uma-label label">
              <span className="jp-label">やる気</span>
              <span className="en-label">Mood</span>
            </label>
            <select name="uma-motivation" className="uma-select">
              <option value="絶好調">絶好調</option>
              <option value="好調">好調</option>
              <option value="普通">普通</option>
              <option value="不調">不調</option>
              <option value="絶不調">絶不調</option>
            </select>
          </div>
        </div>
      </div>
      <div className="calculations-container">
        <Calculations stats={umaStats} />
      </div>
    </div>
  );
};

export default Main;
