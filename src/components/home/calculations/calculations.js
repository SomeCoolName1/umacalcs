import { groundMod } from "../../../game_data/coefficients";
import PassiveSkills from "./passiveskills";
import "./calculations.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getMinMaxSpeed,
  randomSpeed,
  umaTargetSpeed,
  umaSlopeModifier,
  downhillSpeed,
} from "./speed";
import {
  kakariRate,
  skillActivationRate,
  umaAccel,
  downHillMode,
} from "./stapowgutsint";
import { competeBeforeSpurt, competeFight, conservePower, leadCompetition, staminaKeep, staminaLimitBreak } from "./miscCalcs";

const Calculations = ({ stats, setStats }) => {
  const track = useSelector((state) => state.calcsTrack);
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

  const slopesPer = [1, 1.5, 2];

  // //Adjusted/Final Stats
  // //Raw Stats are stats shown in stat panel
  // //Base stats are stats modified by motivation
  // //Adjusted stats are those affected by track modifiers
  // //FinalStat is Adjusted Stat + green (skill modifier)

  // //Thresholds after motivation, pre greens
  const leadCompNote = "Guts-dependent. 逃げ/大逃げ will compete with each other from 150m to 6/24ths of the race when conditions are met. It is force ended at 9/24ths of the race regardless of duration. Hp Consumption in this mode is increased by 1.4x/3.6x(かかり) for にげ and 3.5x/7.7x(かかり) for 大逃げ"
  const leadComp = {EngName: "Lead Competition", JPName: "位置取り争い", output: [{name:"Target Speed", output:`+= ${leadCompetition(stats).targetSpeed} m/s`}, {name:"Duration", output:`${leadCompetition(stats).duration} s`}], note:leadCompNote}

  const compFightNote = "Guts-dependent. On the final straight, conditions are met when multiple umas are close to each other. Competition cannot occur when HP is less than 15%, and will end if HP is <5%"
  const compFight = {EngName: "Compete Fight", JPName: "追い比べ", output: [{name:"Target Speed", output:`+= ${competeFight(stats).targetSpeed} m/s`}, {name:"Accel", output:`${competeFight(stats).accel} m/s2`}], note:compFightNote}

  const consPowerNote = "Power-dependent and must have >1200 power. Every few seconsd, uma checks state to increase/decrease conserved power. Modes that increase are Pace down and Normal Mode. Modes that decrease are Lead Competition and Kakari."
  const consPower = {EngName: "Conserve Power / Release", JPName: "足を貯める / 脚色十分", output: [{name:"Accel", output:`${conservePower(stats)} m/s2`}], note:consPowerNote}
  
  const competeSpurtNote = "Power and Guts dependent. Competing before the spurt between 11/24ths to 15/24ths of the race. Uma checks if she's too far from first place or other umas are nearby to enter competition mode."
  const competeBfSpurt = {EngName: "Compete Before Spurt", JPName: "位置取り調整", output: [{name:"Target Speed", output:`+= ${competeBeforeSpurt(stats).targetSpeed} m/s`},{name:"Stamina Consumption", output:`${competeBeforeSpurt(stats).stamConsumption} hp/s`}], note:competeSpurtNote}
  
  const stamKeepNote = "Wisdom-dependent. The uma will try to conserve a random amount of Hp that is 1.035x-1.04xx the required HP amount to finish the race. Every 2 seconds, she performs a wisdom check to enter stamina keep mode. In this mode, competition mode does not trigger."
  const stamKeep = {EngName: "Stamina Keep", JPName: "持久力温存", output: [{name:"Stamina Keep Chance", output:`${staminaKeep(stats)} %`}], note:stamKeepNote}
  
  const stamLimBreakNote = "Stamina-dependent and must have >1200 stamina. The uma will gain additional speed upon reaching max spurt speed, lasting till the end of the race"
  const stamLimBreak = {EngName: "Stamina Limit Break", JPName: "スタミナ勝負", output: [{name:"Target Speed", output:`+= ${staminaLimitBreak(stats)} m/s`}], note:stamLimBreakNote}
  
  const miscList = [leadComp,compFight,consPower,competeBfSpurt,stamKeep,stamLimBreak]

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

  //RACE PLOT

  return (
    <>
      <h1>Stat Calculations</h1>
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
        <div className="hill-details-container">
          <div className="slope-table-legend">
            <p>Slope</p>
            <p>Uphill Speed Reduction</p>
            <p>Downhill Mode Boost</p>
          </div>
          {slopesPer.map((slope) => (
            <div className="slope-container">
              <p>{`${slope}%`}</p>
              <p>{`- ${umaSlopeModifier(stats, slope)}m/s`}</p>
              <p>{`+ ${downhillSpeed(slope)}m/s`}</p>
            </div>
          ))}
        </div>
        <div className="wisdom-details-container">
          <span>Skill Activation Rate: {skillActivationRate(stats)}%</span>
          <span>Kakari Rate: {kakariRate(stats).toFixed(2)}%</span>
          <span>DownHill Mode Chance: {downHillMode(stats).toFixed(2)}%</span>
        </div>
        <div className="misc-container">
          <span>Note: The calculations are speculative but are close enough.</span>
          {miscList.map((misc)=> (<div className="misc-items-container">
            <div className="misc-item-note-button">{misc.note}</div>
            <div className="misc-legend">           
            <p>{misc.EngName}</p>
            <p>{misc.JPName}</p>   
          </div>
          <div className="misc-items-output">
          
            {misc.output.map((numbers) => (
              <div className="misc-output"><p>{numbers.name}: {numbers.output}</p>
             </div>
            ))}  </div>
          </div>))}        
        </div>
    
      </div>
    </>
  );
};

export default Calculations;


//Lead competition: Lead competition occurs for 逃げ/大逃げ. Note that stamina consumpion is increased significantly