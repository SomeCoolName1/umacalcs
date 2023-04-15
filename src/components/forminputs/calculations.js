import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  coefficients,
  distanceProf,
  groundMod,
  moodCoefficients,
  strategyCoefficients,
} from "../data/coefficients";
import "./calculations.scss";
import PassiveSkills from "./passiveskills";
import evolvedRecovery from "../../assets/skillimages/evolved-recovery.png";
import goldRecovery from "../../assets/skillimages/gold-recovery.png";
import whiteRecovery from "../../assets/skillimages/white-recovery.png";
import whiteSpeed from "../../assets/skillimages/white-speed.png";
import uniqueSpeed from "../../assets/skillimages/unique-speed.png";
import whiteStamDebuff from "../../assets/skillimages/white-stamina-debuff.png";
import goldStamDebuff from "../../assets/skillimages/gold-stamina-debuff.png";
import TrackGraph from "../trackdetails/trackgraph";

const staminaSkills = [
  { img: evolvedRecovery, value: 0.095, number: 0 },
  { img: evolvedRecovery, value: 0.075, number: 0 },
  { img: goldRecovery, value: 0.055, number: 0 },
  { img: uniqueSpeed, value: 0.035, number: 0 },
  { img: whiteRecovery, value: 0.015, number: 0 },
  { img: uniqueSpeed, value: 0.0035, number: 0 },
  { img: whiteSpeed, value: 0.005, number: 0 },
  { img: goldStamDebuff, value: -0.03, number: 0 },
  { img: whiteSpeed, value: -0.02, number: 0 },
  { img: whiteStamDebuff, value: -0.01, number: 0 },
  { img: uniqueSpeed, value: -0.005, number: 0 },
  { img: uniqueSpeed, value: -0.0025, number: 0 },
];

const Calculations = ({ stats }) => {
  const track = useSelector((state) => state.track);
  const proficiency = useSelector((state) => state.proficiency);
  const groundType = useSelector((state) => state.groundType);
  const umaStratMot = useSelector((state) => state.uma);
  const [graphData, setGraphData] = useState(null);

  //Passives
  const [passiveStats, setStats] = useState({
    speed: 0,
    stamina: 0,
    power: 0,
    guts: 0,
    int: 0,
  });

  const [recoverySkills, setRecovery] = useState(staminaSkills);

  if (!track) return;

  //Coefficients and variables
  const { speed, stamina, power, guts, int } = stats;
  const { umaStrategy, umaMotivation } = umaStratMot;

  ////Strategy
  const strategyCI = strategyCoefficients.find(
    (obj) => obj.strategy === umaStrategy
  );
  const { speedCI, accelCI, staminaCI, conserveCI } = strategyCI;

  ////Motivation
  const motivationCI = moodCoefficients.find(
    (obj) => obj.name === umaMotivation
  );
  const { moodCI } = motivationCI;

  ////Track
  let surfaceType;
  const { distance, surface } = track;
  if (surface === 1) {
    surfaceType = "turf";
  } else {
    surfaceType = "dirt";
  }

  const racePhases = [
    { phase: "phase0", distance: [0, distance / 6] },
    { phase: "phase1", distance: [distance / 6, (2 * distance) / 3] },
    { phase: "phase2", distance: [(2 * distance) / 3, (5 * distance) / 6] },
    { phase: "phase3", distance: [(5 * distance) / 6, distance] },
  ];

  ////GroundType
  const groundModCI = groundMod.find((obj) => obj.name === groundType);
  const { groundSpeedMod, groundPowerMod, groundHPMod } = groundModCI;
  const { [surfaceType]: groundSpeed } = groundSpeedMod;
  const { [surfaceType]: groundPower } = groundPowerMod;
  const { [surfaceType]: groundHP } = groundHPMod;

  //Adjusted Stats
  const adjustedStat = () => {
    let baseStats = {};

    Object.keys(stats).forEach((key) => {
      let rawStat =
        Math.min(1200, stats[key]) +
        (stats[key] > 1200 ? (stats[key] - 1200) / 2 : 0);
      baseStats[key] = rawStat * moodCI; //Multiply by mood
    });

    const { speed, stamina, power, guts, int } = baseStats;
    //RaceCousre modifier

    //Ground Modfier -> Track.surface and groundModCI
    const adjustedSpeed = speed + groundSpeed;
    const adjustedStamina = stamina;
    const adjustedPower = power + groundPower;
    const adjustedGuts = guts;
    const adjustedInt = int;
    const adjustedStats = [
      { name: "スペード", engName: "speed", value: adjustedSpeed },
      { name: "スタミナ", engName: "stamina", value: adjustedStamina },
      { name: "パワー", engName: "power", value: adjustedPower },
      { name: "根性", engName: "guts", value: adjustedGuts },
      { name: "賢さ", engName: "int", value: adjustedInt },
    ];

    return adjustedStats;
  };

  // /*SPEED-RELATED*/
  const umaBaseSpeed = () => {
    const speed = 20 - (distance - 2000) / 1000; //[m/s]
    return speed;
  };

  const umaTargetSpeed = (phase) => {
    const { openingLeg, middleLeg, finalLeg } = speedCI;
    let base = umaBaseSpeed();
    let legSpeed;

    const openingBST = base * openingLeg;
    const middleBST = base * middleLeg;
    const finalBST =
      base * finalLeg + Math.sqrt(500 * speed) * proficiency.distance * 0.002; //[m/s]
    const lastSpurtSpeed =
      (finalBST + 0.01 * base) * 1.05 +
      Math.sqrt(500 * speed) * proficiency.distance * 0.002 +
      Math.pow(450 * guts, 0.597) * 0.0001; //[m/s]

    //Opening Leg: Section 1 to 4
    if (phase === "openingLeg" || phase === "phase0") {
      legSpeed = openingBST;
    }
    //Middle Leg: Section 5 to 16
    else if (phase === "middleLeg" || phase === "phase1") {
      legSpeed = middleBST;
    }
    //Final Leg: Section 17 to 20
    else if (phase === "finalLeg" || phase === "phase2") {
      legSpeed = finalBST;
    }
    //Last Spurt: Section 21 to 24
    else {
      legSpeed = lastSpurtSpeed;
    }

    //If uphill
    //TargetSpeed - SlopePer*200/powerStat

    return legSpeed;
  };

  const randomnessSpeed = (phase) => {
    const targetSpeed = umaTargetSpeed(phase);
    const baseSpeed = umaBaseSpeed();

    const max = (int / 5500) * Math.log10(int * 0.1); // Include these in first three phase calculations
    const min = Math.abs(max - 0.65);

    let randomSpeed = baseSpeed * (Math.random() * (max - min) + min);

    return targetSpeed + randomSpeed;
  };

  const umaCurrentSpeed = (currentSpeed, targetspeed, phase) => {
    let umaSpeed;

    const accel = umaAccel(phase);
    const acceledSpeed = currentSpeed + accel;

    if (acceledSpeed >= targetspeed) {
      umaSpeed = targetspeed;
    } else {
      umaSpeed = acceledSpeed;
    }

    return umaSpeed;
  };

  const umaMinimumSpeed = () => {
    const minSpeed = 0.85 * umaBaseSpeed() + Math.sqrt(200 * guts) * 0.001; //[m/s]

    return minSpeed;
  };

  // /*STAMINA-RELATED*/
  const Stamina = () => {
    // MaxHP=0.8*StrategyCoefficient*StaminaStat+CourseDistance[m]
    const maxHP = Math.round(0.8 * staminaCI * stamina + parseInt(distance));

    return maxHP;
  };

  const recoveredHp = (percentage) => {
    return Math.round(Stamina() * percentage) / 0.8;
  };

  const recoveryStaminaValue = () => {
    let recoveryValue = 0;
    let debuffValue = 0;
    let HPValue = 0;

    recoverySkills.map((x) => {
      if (x.value > 0) {
        return (recoveryValue += x.value * x.number);
      } else {
        return (debuffValue += x.value * x.number);
      }
    });

    let recoveredStamina = recoveredHp(recoveryValue);
    let debuffedStamina = recoveredHp(debuffValue);

    let HPRecovered = Stamina() * recoveryValue;
    let HPDebuffed = Stamina() * debuffValue;

    return [
      recoveredStamina.toFixed(1),
      debuffedStamina.toFixed(1),
      HPRecovered.toFixed(1),
      HPDebuffed.toFixed(1),
    ];
  };

  const hpConsumption = (phase, currentspeed) => {
    const gutsModifier = 1.0 + 200 / Math.sqrt(600 * guts);

    if (phase === "openingLeg" || "phase0" || "middleLeg" || "phase1") {
      const hpConsumption =
        ((20 * Math.pow(currentspeed - umaBaseSpeed() + 12, 2)) / 144) *
        groundHP;

      return hpConsumption;
    } else {
      return hpConsumption * gutsModifier;
    }

    //HPCon = 20*(currentspeed - umaBaseSpeed + 12)^2  / 144 * statusmodifier * groundmodifier

    //HPCon in final/last = HPCon * gutsmodifier

    //Current speed is direct result after umaAccel calculations
  };

  // /*POWER-RELATED*/
  const umaAccel = (phase) => {
    const baseAccel = 0.0006; //[m/s^2]
    const { openingLeg, middleLeg, finalLeg } = accelCI;
    // Accel=BaseAccel*sqrt(500.0*PowerStat)*StrategyPhaseCoefficient*
    // GroundTypeProficiencyModifier*DistanceProficiencyModifier+
    // SkillModifier+StartDashModifier

    const accel = (accelCI) => {
      return baseAccel * Math.sqrt(500 * power) * accelCI;
    };

    if (phase === "openingLeg" || phase === "phase0") {
      const startAccel = 24;

      return accel(openingLeg) + startAccel;
      //Ends when 0.85*umaBaseSpeed\\
      //Make current speed the minSpeed once start accel acheives 0.85*umaBaseSpeed
    }
    //Middle Leg: Section 5 to 16
    else if (phase === "middleLeg" || phase === "phase1") {
      return accel(middleLeg);
    }
    //Final Leg: Section 17 to 20
    else {
      return accel(finalLeg);
    }

    const baseUphillAccel = 0.0004;
  };

  // /*WISDOM-RELATED*/

  const skillActivationRate = () => {
    const rate = Math.max(100 - 9000 / int, 20);
    return rate;
  };

  const kakariRate = () => {
    //Hp consumption during kakari = x1.6
    //Every 3 seconds in kakari, the uma has a 55% chance to snap out of it. Kakari ends if the uma is still affected after 12 seconds.
    const rate = Math.pow(6.5 / Math.log10(0.1 * int + 1), 2);
    return rate;
  };

  const downHillMode = () => {
    const downhillModechance = int * 0.04; //'% per second' with exit chance of 20% per second
    const speedIncrease = 0.3; //+SlopePer/10
    const reducedHpConsumption = 60;
  };

  const racePlot = () => {
    let currentPhase = "openingLeg";
    let time = 0;
    let distanceTravelled = 0;
    let speed = 0;
    let targetSpeed = 0; //Updates every phase
    let remainingStamina = Stamina();
    let racePlot = [
      {
        targetSpeed: targetSpeed,
        speed: 0,
        distance: 0,
        time: 0,
        remainingStamina: remainingStamina,
      },
    ];

    let phaseChange = [{ time: 0, phase: "Start" }];

    while (distanceTravelled <= distance) {
      //Checks current phase based on distancetravelled
      racePhases.map((phase) => {
        let phaseStart = phase.distance[0];
        let phaseEnd = phase.distance[1];
        if (
          phaseStart <= distanceTravelled &&
          distanceTravelled <= phaseEnd &&
          currentPhase !== phase.phase
        ) {
          phaseChange.push({
            time: time,
            phase: `← ${currentPhase} | ${phase.phase} →`,
          });
          currentPhase = phase.phase;
          targetSpeed = randomnessSpeed(currentPhase);
        }
      });

      //Need to capture exact time once past goal

      time += 1; //s
      distanceTravelled += umaCurrentSpeed(speed, targetSpeed, currentPhase); //m

      speed = umaCurrentSpeed(speed, targetSpeed, currentPhase);
      remainingStamina -= hpConsumption(currentPhase, speed); //Remaining stamina always after speed

      racePlot.push({
        speed: speed,
        distance: distanceTravelled,
        time: time,
        remainingStamina: remainingStamina,
        targetSpeed: targetSpeed,
      });
    }

    return { racePlot, phaseChange };
  };

  console.log(racePlot());
  const updateStaminaValues = (stamina, op) => {
    let newCopy = [...recoverySkills];
    let findStamina = newCopy.find((key) => key === stamina);
    if (op === "add") {
      findStamina.number += 1;
    } else findStamina.number -= 1;

    setRecovery(newCopy);
  };

  return (
    <div className="">
      <h1>Stat Calculations</h1>
      <PassiveSkills setStats={setStats} passiveStats={passiveStats} />
      <h2>Corrected Stats</h2>
      <div className="adjusted-stats-container stats-container">
        {adjustedStat().map((stat) => {
          return (
            <div className="uma-stat">
              <label className="label uma-label">
                <span className="jp-label">{stat.name}</span>
                <span className="en-label">{stat.engName}</span>
              </label>
              <span className="label-value">
                {stat.value}
                <span
                  style={{
                    color:
                      passiveStats[stat.engName] >= 0
                        ? "rgb(105, 193, 12)"
                        : "rgb(159, 90, 247)",
                  }}
                >
                  {" "}
                  + {passiveStats[stat.engName]}
                  {/* {stat.engName === "stamina" ? (
                    <>
                      <span className="recoveredStamina">
                        {" "}
                        + {recoveryStaminaValue()[0]}
                      </span>
                      <span className="debuffedStamina">
                        {" "}
                        - {Math.abs(recoveryStaminaValue()[1])}
                      </span>
                    </>
                  ) : (
                    ""
                  )} */}
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <h2>Speed and Acceleration</h2>
      <div className="speed-accel-container">
        <div className="speed-accel-phase">
          <h3>Phase</h3>
          <p>Opening Leg </p>
          <p>Middle Leg </p>
          <p>Final Leg</p>
          <p>Last Spurt </p>
        </div>
        <div className="leg-speed-container">
          <h3>Leg Speed</h3>
          <p>{umaTargetSpeed("phase0") + ` m/s`} </p>
          <p>{umaTargetSpeed("phase1") + ` m/s`}</p>
          <p>{umaTargetSpeed("phase2") + ` m/s`}</p>
          <p>{umaTargetSpeed("") + ` m/s`}</p>
        </div>

        <div className="acceleration-container">
          <h3>Acceleration</h3>
          <p>{umaAccel("phase0") + ` m/s²`} </p>
          <p>{umaAccel("phase1") + ` m/s²`}</p>
          <p>{umaAccel("phase2") + ` m/s²`}</p>
          <p>{umaAccel("phase2") + ` m/s²`}</p>
        </div>
      </div>

      <h2>Stamina Recovered</h2>
      <p>
        Starting HP: {Stamina()}
        <span className="recoveredStamina">
          {" "}
          + {recoveryStaminaValue()[2]}{" "}
        </span>
        <span className="debuffedStamina">
          {" "}
          - {Math.abs(recoveryStaminaValue()[3])}
        </span>
      </p>
      <div className="stamina-equivalent-container">
        {recoverySkills.map((key) => {
          return (
            <div className="stamina-equivalent">
              <div className="stamina-details stat-details">
                <img src={key.img} alt="stamina-skill" />
                <p>
                  {(key.value * 100).toFixed(2)}% : {recoveredHp(key.value)}{" "}
                  Stamina{" "}
                </p>
              </div>
              <div className="number-of-passives">
                <button
                  className={`number-button ${
                    key.number <= 0 ? "disabled" : ""
                  }`}
                  onClick={() => updateStaminaValues(key, "minus")}
                >
                  −
                </button>
                <p>{key.number}</p>
                <button
                  className="number-button"
                  onClick={() => updateStaminaValues(key, "add")}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <h2>Wisdom Related</h2>
      <p>Skill Activation Rate:{skillActivationRate()}%</p>
      <p>Kakari Rate:{kakariRate().toFixed(2)}%</p>
      <TrackGraph dataPlot={racePlot()} />
    </div>
  );
};

export default Calculations;
