import { groundMod } from "../data/coefficients";
import RecoverySkills from "../data/skillsrecovery";
import SkillBox from "../factory/skillbox";
import Collapsible from "react-collapsible";
import PassiveSkills from "./passiveskills";
import "./calculations.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMinMaxSpeed, randomSpeed, umaTargetSpeed } from "./speed";
import {
  getMaxHP,
  kakariRate,
  recoveryStaminaValue,
  skillActivationRate,
  umaAccel,
} from "./stapowgutsint";

const Calculations = ({ stats, setStats }) => {
  const track = useSelector((state) => state.track);
  const proficiency = useSelector((state) => state.proficiency);
  const groundType = useSelector((state) => state.groundType);
  const umaStratMot = useSelector((state) => state.uma);

  //Passives
  const [passiveStats, setPassivestats] = useState({
    speed: 0,
    stamina: 0,
    power: 0,
    guts: 0,
    int: 0,
  });
  const [umaReco, setUmaReco] = useState(RecoverySkills);

  useEffect(() => {
    adjustStats();
    //First dependency checks if basevalue are changed sicne adjustStats() will
    //infinitely loop
  }, [
    ...Object.values(stats).map((x) => x.value),
    passiveStats,
    umaStratMot,
    proficiency,
  ]);

  //Destructuring
  const { umaMotivation } = umaStratMot;
  const { profStrategy } = proficiency;

  ////Track
  let surfaceType;
  const { distance, surface, threshold } = track;

  if (surface === 1) {
    surfaceType = "turf";
  } else {
    surfaceType = "dirt";
  }
  ////GroundType
  const groundModCI = groundMod.find((obj) => obj.name === groundType);
  const { groundSpeedMod, groundPowerMod, groundHPMod } = groundModCI;
  const { [surfaceType]: groundSpeed } = groundSpeedMod;
  const { [surfaceType]: groundPower } = groundPowerMod;
  // const { [surfaceType]: groundHP } = groundHPMod;

  const racePhases = [
    { phase: "phase0", distance: [0, distance / 6] },
    { phase: "phase1", distance: [distance / 6, (2 * distance) / 3] },
    { phase: "phase2", distance: [(2 * distance) / 3, (5 * distance) / 6] },
    { phase: "phase3", distance: [(5 * distance) / 6, distance] },
  ];

  // //Adjusted/Final Stats
  // //Raw Stats are stats shown in stat panel
  // //Base stats are stats modified by motivation
  // //Adjusted stats are those affected by track modifiers
  // //FinalStat is Adjusted Stat + green (skill modifier)

  // //Thresholds after motivation, pre greens

  const adjustStats = () => {
    let baseStats = { ...stats };
    let courseModifier = 1;

    Object.values(baseStats).forEach((key) => {
      let currentStat = key.en;
      let jpCurrentStat = key.jp;
      let initialStat = stats[currentStat].value;

      let rawStat =
        Math.min(1200, initialStat) +
        (initialStat > 1200 ? (initialStat - 1200) / 2 : 0);

      //Only for int does profiency affect base stat
      if (currentStat === "int") {
        rawStat *= profStrategy;
      }

      let moodAdjusted = Math.round(rawStat * umaMotivation);

      if (threshold) {
        if (threshold.find((x) => x === jpCurrentStat)) {
          if (moodAdjusted <= 300) {
            courseModifier += 0.05;
          } else if (moodAdjusted > 300 && moodAdjusted <= 600) {
            courseModifier += 0.1;
          } else if (moodAdjusted > 600 && moodAdjusted <= 900) {
            courseModifier += 0.15;
          } else if (moodAdjusted > 900) {
            courseModifier += 0.2;
          }
        }
      }

      if (currentStat === "power") {
        moodAdjusted += groundPower;
      }

      key.adjusted = moodAdjusted; //Multiply by mood
      key.final = moodAdjusted + passiveStats[currentStat];
    });

    //Race Course Modifier
    baseStats["speed"].adjusted = Math.round(
      baseStats["speed"].adjusted * courseModifier
    );

    baseStats["speed"].final = Math.round(
      baseStats["speed"].adjusted * courseModifier +
        groundSpeed +
        passiveStats["speed"]
    );

    setStats(baseStats);
  };

  const maxHP = getMaxHP(stats);

  const recoveredHp = (percentage) => {
    return Math.round(maxHP * percentage) / 0.8;
  };

  const updateStaminaValues = (key, operator) => {
    let skillsList = { ...umaReco };

    let findSkill = Object.values(skillsList).find((skill) => skill === key);
    operator === "add"
      ? (findSkill.skillValue[0].amount += 1)
      : (findSkill.skillValue[0].amount -= 1);

    setUmaReco(skillsList);
  };

  //RACE PLOT

  return (
    <Collapsible trigger={<h1>Stat Calculations</h1>}>
      <div className="calculations-container">
        <PassiveSkills
          setPassiveStats={setPassivestats}
          passiveStats={passiveStats}
        />
        <h2>Corrected Stats</h2>
        <div className="adjusted-stats-container stats-container">
          {Object.values(stats).map((stat, index) => {
            return (
              <div className="uma-stat" key={index}>
                <label className="label uma-label">
                  <span className="jp-label">{stat.jp}</span>
                  <span className="en-label">{stat.en}</span>
                </label>
                <span className="label-value">
                  {stat.adjusted}
                  <span
                    style={{
                      color:
                        passiveStats[stat.en] >= 0
                          ? "rgb(105, 193, 12)"
                          : "rgb(159, 90, 247)",
                    }}
                  >
                    {" "}
                    + {passiveStats[stat.en]}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
        <h2>Race Calculations</h2>
        <div className="speed-accel-container">
          <div className="speed-accel-phase">
            <h3>Phase</h3>
            <p>Opening Leg </p>
            <p>Middle Leg </p>
            <p>Final Leg</p>
            <p>Last Spurt </p>
          </div>
          <div className="leg-speed-container">
            <h3>
              Target Speed
              <p className="leg-speed-min-max">{`[Min: ${
                getMinMaxSpeed(stats).min
              }%, Max: ${getMinMaxSpeed(stats).max}%]`}</p>
            </h3>
            {racePhases.map((x) => (
              <div className="leg-speed-calc-container">
                <p>{umaTargetSpeed(stats, x.phase).toFixed(3) + ` m/s`} </p>
                <p className="leg-speed-min-max">{`[${randomSpeed(
                  stats,
                  x.phase,
                  "min"
                )} m/s, ${randomSpeed(stats, x.phase, "max")} m/s]`}</p>
              </div>
            ))}
          </div>
          <div className="acceleration-container">
            <h3>Accel</h3>
            {racePhases.map((x) => (
              <p>{umaAccel(stats, x.phase).toFixed(3) + ` m/s²`} </p>
            ))}
          </div>
        </div>
        <div className="wisdom-details-container">
          <span>Skill Activation Rate: {skillActivationRate(stats)}%</span>
          <span>Kakari Rate: {kakariRate(stats).toFixed(2)}%</span>
        </div>
        <h2>Stamina Recovered</h2>
        <div className="stamina-container">
          <p>
            Starting HP: {maxHP}
            <span className="recoveredStamina">
              {" "}
              + {recoveryStaminaValue(maxHP).HPRec.toFixed(2)}{" "}
            </span>
            <span className="debuffedStamina">
              {" "}
              - {Math.abs(recoveryStaminaValue(maxHP).HPDeb.toFixed(2))}
            </span>
          </p>
          <div className="skill-box-container">
            {Object.values(RecoverySkills).map((key, index) => (
              <SkillBox
                key={index}
                skill={key}
                recovered={recoveredHp}
                updateButton={updateStaminaValues}
                skillType={"recovery"}
              />
            ))}
          </div>
        </div>
      </div>
    </Collapsible>
  );
};

export default Calculations;
