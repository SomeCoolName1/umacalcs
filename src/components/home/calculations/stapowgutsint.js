import { store } from "../../../App";
import RecoverySkills from "../data/skillsrecovery";
const { useSelector } = require("react-redux");
const { strategyCoefficients, groundMod } = require("../data/coefficients");

export function getCoefficients() {
  const umaStratMot = store.getState().uma;

  const { umaStrategy, umaMotivation } = umaStratMot;
  const strategyCI = strategyCoefficients.find(
    (obj) => obj.strategy === umaStrategy
  );
  const { accelCI, staminaCI, conserveCI } = strategyCI;

  return { accelCI: accelCI, staminaCI: staminaCI };
}

export function umaBaseSpeed() {
  const track = store.getState().track;
  const { distance } = track;

  let baseSpeed = 20 - (distance - 2000) / 1000; //[m/s]
  return baseSpeed;
}

export function groundMods() {
  const track = store.getState().track;
  const groundType = store.getState().groundType;

  const { distance, surface } = track;
  let surfaceType;

  if (surface === 1) {
    surfaceType = "turf";
  } else {
    surfaceType = "dirt";
  }

  const groundModCI = groundMod.find((obj) => obj.name === groundType);
  const { groundHPMod } = groundModCI;
  const { [surfaceType]: groundHP } = groundHPMod;

  let umaBaseSpeed = 20 - (distance - 2000) / 1000; //[m/s]

  return { baseSpeed: umaBaseSpeed, groundHP: groundHP };
}

///////////////////////------------------------------

export function getMaxHP(stats) {
  const track = store.getState().track;
  const { distance } = track;
  const { staminaCI } = getCoefficients();

  return 0.8 * staminaCI * stats.stamina.final + parseInt(distance);
}

export function hpConsumption(stats, phase, currentSpeed) {
  const { baseSpeed, groundHP } = groundMods();
  let guts = stats.guts.final;
  const gutsModifier = 1.0 + 200 / Math.sqrt(600 * guts);

  if (phase === "openingLeg" || "phase0" || "middleLeg" || "phase1") {
    const hpConsumption =
      ((20 * Math.pow(currentSpeed - baseSpeed + 12, 2)) / 144) * groundHP;

    return hpConsumption;
  } else {
    return hpConsumption * gutsModifier;
  }

  //HPCon = 20*(currentspeed - umaBaseSpeed + 12)^2  / 144 * statusmodifier * groundmodifier
  //HPCon in final/last = HPCon * gutsmodifier

  //Current speed is direct result after umaAccel calculations
}

export function recoveryStaminaValue(maxHP) {
  let recoveryValue = 0;
  let debuffValue = 0;
  let HPValue = 0;

  Object.values(RecoverySkills).map((x) =>
    x.value > 0
      ? (recoveryValue += x.value * x.skillValue[0].amount)
      : (debuffValue += x.value * x.skillValue[0].amount)
  );

  let recoveredStamina = Math.round(maxHP * recoveryValue) / 0.8;
  let debuffedStamina = Math.round(maxHP * debuffValue);

  let HPRecovered = maxHP * recoveryValue;
  let HPDebuffed = maxHP * debuffValue;

  return {
    staRec: recoveredStamina,
    staDeb: debuffedStamina,
    HPRec: HPRecovered,
    HPDeb: HPDebuffed,
  };
}

export function umaAccel(stats, phase) {
  let power = stats.power.final;
  const baseSpeed = umaBaseSpeed();
  const { accelCI } = getCoefficients();

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
    const startAccel = Math.min(24, 0.85 * baseSpeed);

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
}

export function skillActivationRate(stats) {
  let int = stats.int.value;
  const rate = Math.max(100 - 9000 / int, 20);
  return rate;
}

export function kakariRate(stats) {
  let int = stats.int.final;
  //Hp consumption during kakari = x1.6
  //Every 3 seconds in kakari, the uma has a 55% chance to snap out of it. Kakari ends if the uma is still affected after 12 seconds.
  const rate = Math.pow(6.5 / Math.log10(0.1 * int + 1), 2);
  return rate;
}

export function downHillMode(stats) {
  let int = stats.int.final;
  const downhillModechance = int * 0.04; //'% per second' with exit chance of 20% per second
  const speedIncrease = 0.3; //+SlopePer/10
  const reducedHpConsumption = 60;
}
