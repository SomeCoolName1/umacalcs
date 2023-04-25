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
import RecoverySkills from "../data/skillsrecovery";
import TrackGraph from "../trackdetails/trackgraph";
import SkillBox from "../factory/skillbox";
import Coursedetails from "../trackdetails/coursedetails";
import Racetrack from "../trackdetails/racetrack";

const initialAdjusted = {
  speed: { en: "speed", jp: "スペード", adjusted: 0, final: 0 },
  stamina: { en: "stamina", jp: "スタミナ", adjusted: 0, final: 0 },
  power: { en: "power", jp: "パワー", adjusted: 0, final: 0 },
  guts: { en: "guts", jp: "根性", adjusted: 0, final: 0 },
  int: { en: "int", jp: "賢さ", adjusted: 0, final: 0 },
};

const Calculations = ({ stats }) => {
  const track = useSelector((state) => state.track);
  const proficiency = useSelector((state) => state.proficiency);
  const groundType = useSelector((state) => state.groundType);
  const umaStratMot = useSelector((state) => state.uma);

  console.log("the track", track);

  const [umaReco, setUmaReco] = useState(RecoverySkills);

  //Passives
  const [passiveStats, setStats] = useState({
    speed: 0,
    stamina: 0,
    power: 0,
    guts: 0,
    int: 0,
  });

  const [finalStats, setFinalStats] = useState(initialAdjusted);

  //Coefficients and variables
  const {
    speed: baseSpeed,
    stamina: baseStamina,
    power: basePower,
    guts: baseGuts,
    int: baseInt,
  } = stats;

  const {
    speed: finalSpeed,
    stamina: finalStamina,
    power: finalPower,
    guts: finalGuts,
    int: finalInt,
  } = finalStats;

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

  console.log("hi, before distance'");

  ////Track
  let surfaceType;

  const { distance, surface } = track;

  if (surface === 1) {
    surfaceType = "turf";
  } else {
    surfaceType = "dirt";
  }

  console.log("distance", track);

  ////GroundType
  const groundModCI = groundMod.find((obj) => obj.name === groundType);
  const { groundSpeedMod, groundPowerMod, groundHPMod } = groundModCI;
  const { [surfaceType]: groundSpeed } = groundSpeedMod;
  const { [surfaceType]: groundPower } = groundPowerMod;
  const { [surfaceType]: groundHP } = groundHPMod;

  const racePhases = [
    { phase: "phase0", distance: [0, distance / 6] },
    { phase: "phase1", distance: [distance / 6, (2 * distance) / 3] },
    { phase: "phase2", distance: [(2 * distance) / 3, (5 * distance) / 6] },
    { phase: "phase3", distance: [(5 * distance) / 6, distance] },
  ];

  // //Adjusted/Final Stats
  // //Stats Notes:
  // //Raw Stats are stats shown in stat panel
  // //Base stats are stats modified by motivation
  // //Adjusted stats are those affected by track modifiers
  // //FinalStat is Adjusted Stat + green (skill modifier)
  // //Thresholds after motivation, pre greens

  const adjustStats = () => {
    //RaceCousre modifier

    let baseStats = { ...finalStats };

    Object.values(baseStats).forEach((key) => {
      let currentStat = key.en;
      let initialStat = stats[currentStat].value;

      let rawStat =
        Math.min(1200, initialStat) +
        (initialStat > 1200 ? (initialStat - 1200) / 2 : 0);
      let moodAdjusted = Math.round(rawStat * moodCI);

      if (currentStat === "speed") {
        moodAdjusted += groundSpeed;
      } else if (currentStat === "power") {
        moodAdjusted += groundPower;
      }

      key.adjusted = moodAdjusted; //Multiply by mood
      key.final = moodAdjusted + passiveStats[currentStat];
    });
  };

  useEffect(() => {
    adjustStats();
  }, []);

  // /////////////////SPEED RELATED
  let umaBaseSpeed = 20 - (distance - 2000) / 1000; //[m/s]
  let umaMinSpeed =
    0.85 * umaBaseSpeed + Math.sqrt(200 * finalGuts.final) * 0.001; //[m/s]

  const umaTargetSpeed = (phase) => {
    let legSpeed;
    let uphillSpeedReduc = 0;
    let speed = finalSpeed.final;
    let guts = finalGuts.final;

    const { openingLeg, middleLeg, finalLeg } = speedCI;

    const openingBTS = umaBaseSpeed * openingLeg; //[m/s]
    const middleBTS = umaBaseSpeed * middleLeg; //[m/s]
    const finalBTS =
      umaBaseSpeed * finalLeg +
      Math.sqrt(500 * speed) * proficiency.distance * 0.002; //[m/s]
    const lastSpurtSpeed =
      (finalBTS + 0.01 * umaBaseSpeed) * 1.05 +
      Math.sqrt(500 * speed) * proficiency.distance * 0.002 +
      Math.pow(450 * guts, 0.597) * 0.0001; //[m/s]

    //Opening Leg: Section 1 to 4
    if (phase === "phase0") {
      legSpeed = openingBTS;
    }
    //Middle Leg: Section 5 to 16
    else if (phase === "phase1") {
      legSpeed = middleBTS;
    }
    //Final Leg: Section 17 to 20
    else if (phase === "phase2") {
      legSpeed = finalBTS;
    }
    //Last Spurt: Section 21 to 24
    else {
      legSpeed = lastSpurtSpeed;
    }

    //If uphill
    //TargetSpeed - SlopePer*200/powerStat

    //If downhill
    //target speed + 0.3 + slopePer/10

    return legSpeed;
  };

  console.log("basespeed", umaBaseSpeed);
  const randomSpeed = (phase) => {
    const targetSpeed = umaTargetSpeed(phase);
    let int = finalInt.final;

    const max = (int / 5500) * Math.log10(int * 0.1); // Include these in first three phase calculations
    const min = Math.abs(max - 0.65);

    let randomSpeed = umaBaseSpeed * (Math.random() * (max - min) + min);

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

  // ///////////////////STAMINA RELATED

  let maxHP = Math.round(
    0.8 * staminaCI * finalStamina.final + parseInt(distance)
  );

  const recoveredHp = (percentage) => {
    return Math.round(maxHP * percentage) / 0.8;
  };

  const recoveryStaminaValue = () => {
    let recoveryValue = 0;
    let debuffValue = 0;
    let HPValue = 0;

    Object.values(RecoverySkills).map((x) =>
      x.value > 0
        ? (recoveryValue += x.value * x.skillValue[0].amount)
        : (debuffValue += x.value * x.skillValue[0].amount)
    );

    let recoveredStamina = recoveredHp(recoveryValue);
    let debuffedStamina = recoveredHp(debuffValue);

    let HPRecovered = maxHP * recoveryValue;
    let HPDebuffed = maxHP * debuffValue;

    return {
      staRec: recoveredStamina,
      staDeb: debuffedStamina,
      HPRec: HPRecovered,
      HPDeb: HPDebuffed,
    };
  };

  const hpConsumption = (phase, currentspeed) => {
    let guts = finalGuts.final;
    const gutsModifier = 1.0 + 200 / Math.sqrt(600 * guts);

    if (phase === "openingLeg" || "phase0" || "middleLeg" || "phase1") {
      const hpConsumption =
        ((20 * Math.pow(currentspeed - umaBaseSpeed + 12, 2)) / 144) * groundHP;

      return hpConsumption;
    } else {
      return hpConsumption * gutsModifier;
    }

    //HPCon = 20*(currentspeed - umaBaseSpeed + 12)^2  / 144 * statusmodifier * groundmodifier

    //HPCon in final/last = HPCon * gutsmodifier

    //Current speed is direct result after umaAccel calculations
  };

  const updateStaminaValues = (key, operator) => {
    let skillsList = { ...umaReco };

    let findSkill = Object.values(skillsList).find((skill) => skill === key);

    operator === "add"
      ? (findSkill.skillValue[0].amount += 1)
      : (findSkill.skillValue[0].amount -= 1);

    setUmaReco(skillsList);
  };

  // // /*POWER-RELATED*/
  const umaAccel = (phase) => {
    let power = finalPower.final;

    const baseAccel = 0.0006; //[m/s^2]
    const baseUphillAccel = 0.0004;

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
  };

  // // /*WISDOM-RELATED*/

  const skillActivationRate = () => {
    let int = baseInt.value;
    const rate = Math.max(100 - 9000 / int, 20);
    return rate;
  };

  const kakariRate = () => {
    let int = finalInt.final;
    //Hp consumption during kakari = x1.6
    //Every 3 seconds in kakari, the uma has a 55% chance to snap out of it. Kakari ends if the uma is still affected after 12 seconds.
    const rate = Math.pow(6.5 / Math.log10(0.1 * int + 1), 2);
    return rate;
  };

  const downHillMode = () => {
    let int = finalInt.final;
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
    const { HPRec, HPDeb } = recoveryStaminaValue();

    let remainingStamina = Math.round(maxHP + HPRec + HPDeb);

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
          targetSpeed = randomSpeed(currentPhase);
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

  console.log(umaTargetSpeed("phase0").toFixed(2));

  return (
    <>
      <h1>Stat Calculations</h1>
      <PassiveSkills setStats={setStats} passiveStats={passiveStats} />
      <h2>Corrected Stats</h2>
      <div className="adjusted-stats-container stats-container">
        {Object.values(finalStats).map((stat, index) => {
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
          <p>{umaTargetSpeed("phase0").toFixed(2) + ` m/s`} </p>
          <p>{umaTargetSpeed("phase1").toFixed(2) + ` m/s`}</p>
          <p>{umaTargetSpeed("phase2").toFixed(2) + ` m/s`}</p>
          <p>{umaTargetSpeed("").toFixed(2) + ` m/s`}</p>
        </div>
        <div className="acceleration-container">
          <h3>Acceleration</h3>
          <p>{umaAccel("phase0").toFixed(2) + ` m/s²`} </p>
          <p>{umaAccel("phase1").toFixed(2) + ` m/s²`}</p>
          <p>{umaAccel("phase2").toFixed(2) + ` m/s²`}</p>
          <p>{umaAccel("phase2").toFixed(2) + ` m/s²`}</p>
        </div>
      </div>
      <h2>Stamina Recovered</h2>
      <p>
        Starting HP: {maxHP}
        <span className="recoveredStamina">
          {" "}
          + {recoveryStaminaValue().HPRec.toFixed(2)}{" "}
        </span>
        <span className="debuffedStamina">
          {" "}
          - {Math.abs(recoveryStaminaValue().HPDeb.toFixed(2))}
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

      <h2>Wisdom Related</h2>
      <div className="wisdom-details-container">
        <span>Skill Activation Rate:{skillActivationRate()}%</span>
        <span>Kakari Rate:{kakariRate().toFixed(2)}%</span>
      </div>
      <Coursedetails />
      <Racetrack />
      <h2>Race Simulation</h2>
      <TrackGraph dataPlot={racePlot()} />
    </>
  );
};

export default Calculations;
