const { useSelector } = require("react-redux");
const { randomSpeed, umaCurrentSpeed } = require("./speed");
const { recoveryStaminaValue, hpConsumption } = require("./stapowgutsint");
const { strategyCoefficients } = require("../data/coefficients");

const RaceCalculations = (stats) => {
  const umaStratMot = useSelector((state) => state.uma);
  const track = useSelector((state) => state.track);
  const { umaStrategy } = umaStratMot;
  const { distance } = track;

  const strategyCI = strategyCoefficients.find(
    (obj) => obj.strategy === umaStrategy
  );
  const { speedCI, accelCI, staminaCI, conserveCI } = strategyCI;

  let maxHP = Math.round(
    0.8 * staminaCI * stats.stamina.final + parseInt(distance)
  );

  const racePhases = [
    { phase: "phase0", distance: [0, distance / 6] },
    { phase: "phase1", distance: [distance / 6, (2 * distance) / 3] },
    { phase: "phase2", distance: [(2 * distance) / 3, (5 * distance) / 6] },
    { phase: "phase3", distance: [(5 * distance) / 6, distance] },
  ];

  return { maxHP: maxHP, distance: distance, racePhases: racePhases };
};

export function raceSimPlot(section, stats) {
  const { distance, maxHP, racePhases } = RaceCalculations(stats);

  let currentPhase = "phase0";
  let speed = 0;
  let targetSpeed = randomSpeed(stats, currentPhase, "random"); //Updates every phase
  let distanceTravelled = 0;
  let time = 0;
  let currentSection = section[0].type;
  const { HPRec, HPDeb } = recoveryStaminaValue(maxHP);
  let remainingStamina = Math.round(maxHP + HPRec + HPDeb);

  let racePlot = [
    {
      phase: currentPhase,
      speed: 0,
      targetSpeed: targetSpeed,
      distance: 0,
      time: 0,
      remainingStamina: remainingStamina,
      currentSection: currentSection,
    },
  ];

  while (distanceTravelled <= distance) {
    //Check if phase needs to be changed before calculations
    //If Phase change, updates target speed
    for (let i = 0; i < racePhases.length; i++) {
      let phase = racePhases[i];
      let start = phase.distance[0];
      let end = phase.distance[1];
      //   let phaseChange = [{ time: 0, phase: "start" }];
      if (
        start <= distanceTravelled &&
        distanceTravelled <= end &&
        currentPhase !== phase.phase
      ) {
        //         phaseChange.push({
        //           time: time,
        //           phase: `← ${currentPhase} | ${phase.phase} →`,
        //         });
        currentPhase = phase.phase;
        targetSpeed = randomSpeed(stats, currentPhase, "random");
      }
    }

    for (let i = 0; i < section.length; i++) {
      if (
        distanceTravelled >= section[i].distance[0] &&
        distanceTravelled <= section[i].distance[1]
      ) {
        console.log(distanceTravelled, section[i]);
        currentSection = section[i].type;
      }
    }

    time += 1; //1 second intervals
    let currentSpeed = umaCurrentSpeed(stats, speed, targetSpeed, currentPhase); //Calculate speed first
    speed = currentSpeed;
    distanceTravelled += currentSpeed;
    remainingStamina -= hpConsumption(stats, currentPhase, currentSpeed); //Remaining stamina always after speed

    racePlot.push({
      phase: currentPhase,
      speed: currentSpeed,
      targetSpeed: targetSpeed,
      distance: distanceTravelled,
      time: time,
      remainingStamina: remainingStamina,
      currentSection: currentSection,
    });
  }

  return { racePlot };
}
