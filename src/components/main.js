import { useState } from "react";
import "./main.scss";
import Details from "./umadetails/details";
import Calculations from "./calculations/calculations";
import Coursedetails from "./trackdetails/coursedetails";
import Collapsible from "react-collapsible";
import Racetrack from "./trackdetails/racetrack";

const initialStats = {
  speed: { en: "speed", jp: "スペード", value: 1000, adjusted: 0, final: 0 },
  stamina: {
    en: "stamina",
    jp: "スタミナ",
    value: 1000,
    adjusted: 0,
    final: 0,
  },
  power: { en: "power", jp: "パワー", value: 1000, adjusted: 0, final: 0 },
  guts: { en: "guts", jp: "根性", value: 1000, adjusted: 0, final: 0 },
  int: { en: "int", jp: "賢さ", value: 1000, adjusted: 0, final: 0 },
};

const Main = () => {
  const [umaStats, setUmaStats] = useState(initialStats);

  return (
    <div className="main-container">
      <Details stats={umaStats} setStats={setUmaStats} />
      <Calculations stats={umaStats} setStats={setUmaStats} />
      <h1>Track Details</h1>
      <div className="race-course-container">
        <Coursedetails />
        <Racetrack stats={umaStats} />
      </div>
    </div>
  );
};

export default Main;
