import { store } from "../../App";
import { strategyCoefficients } from "../data/coefficients";
import { umaAccel } from "./stapowgutsint";

export function getSpeedCoefficients() {
  const proficiency = store.getState().proficiency;
  const umaStratMot = store.getState().uma;

  const { umaStrategy } = umaStratMot;
  const strategyCI = strategyCoefficients.find(
    (obj) => obj.strategy === umaStrategy
  );

  const { speedCI } = strategyCI;
  const { profDistance } = proficiency;

  return { speedCI: speedCI, profDistance: profDistance };
}

export function umaBaseSpeed() {
  const track = store.getState().track;
  const { distance } = track;

  const baseSpeed = 20 - (distance - 2000) / 1000; //[m/s]
  return baseSpeed;
}

export function umaMinSpeed(stats) {
  const minSpeed =
    0.85 * umaBaseSpeed() + Math.sqrt(200 * stats.guts.final) * 0.001; //[m/s]
  return minSpeed;
}

export function umaTargetSpeed(stats, phase) {
  const { speedCI, profDistance } = getSpeedCoefficients();
  const { openingLeg, middleLeg, finalLeg } = speedCI;

  const baseSpeed = umaBaseSpeed();

  let legSpeed;
  let uphillSpeedReduc = 0;
  let speed = stats.speed.final;
  let guts = stats.guts.final;

  const openingBTS = baseSpeed * openingLeg; //[m/s]
  const middleBTS = baseSpeed * middleLeg; //[m/s]
  const finalBTS =
    baseSpeed * finalLeg + Math.sqrt(500 * speed) * profDistance * 0.002; //[m/s]
  const lastSpurtSpeed =
    (finalBTS + 0.01 * baseSpeed) * 1.05 +
    Math.sqrt(500 * speed) * profDistance * 0.002 +
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
}

export function getMinMaxSpeed(stats) {
  let int = stats.int.final;

  const max = (int / 5500) * Math.log10(int * 0.1); // Include these in first three phase calculations
  const min = max - 0.65;

  return {
    max: Math.round(max * 1000) / 1000,
    min: Math.round(min * 1000) / 1000,
  };
}

export function randomSpeed(stats, phase, type) {
  const baseSpeed = umaBaseSpeed();
  const targetSpeed = umaTargetSpeed(stats, phase);

  let { max, min } = getMinMaxSpeed(stats);
  let randomSpeed;

  if (phase === "phase3") {
    randomSpeed = 0;
  } else {
    if (type === "random") {
      randomSpeed = (baseSpeed * (Math.random() * (max - min) + min)) / 100;
    } else if (type === "min") {
      randomSpeed = (baseSpeed * min) / 100;
    } else if (type === "max") {
      randomSpeed = (baseSpeed * max) / 100;
    } else return;
  }

  return Math.round((targetSpeed + randomSpeed) * 1000) / 1000;
}

export function umaCurrentSpeed(stats, currentSpeed, targetSpeed, phase) {
  let umaSpeed;

  const accel = umaAccel(stats, phase);
  const acceledSpeed = currentSpeed + accel;

  if (acceledSpeed >= targetSpeed) {
    umaSpeed = targetSpeed;
  } else {
    umaSpeed = acceledSpeed;
  }

  return umaSpeed;
}
