import { store } from "../../../App";
import { strategyCoefficients, strategyDistCoeff } from "../../../game_data/coefficients";
import { umaAccel } from "./stapowgutsint";

export function leadCompetition(stats) {
    //For runners

    const guts = stats.guts.final

    const targetSpeed = Math.pow((500 * guts),0.6)*0.0001 //+= m/s
    const duration = Math.pow((700*guts),0.5)*0.012 //s

    return {targetSpeed:targetSpeed.toFixed(2), duration:duration.toFixed(2)}
}

export function competeFight(stats) {
    const guts = stats.guts.final

    const targetSpeed = Math.pow((200*guts),0.708)*0.0001
    const accel = Math.pow((160*guts),0.59)*0.0001

    return {targetSpeed:targetSpeed.toFixed(2), accel:accel.toFixed(2)}
}

export function conservePower(stats) {
    const umaStrategy = store.getState().uma.umaStrategy;
    const courseDist = store.getState().calcsTrack.distanceType
    const distanceCoeff = strategyDistCoeff

    const getdistCoeff = distanceCoeff[umaStrategy]?.[courseDist] ?? 1;
   

    const power = stats.power.final

    if (power <1200) {
        return 0
    }


    const accel = (Math.sqrt((power - 1200) * 130)) * 0.001 * (getdistCoeff);

    return accel.toFixed(2)
}

export function competeBeforeSpurt(stats) {
    const umaStrategy = store.getState().uma.umaStrategy;
    const courseDist = store.getState().calcsTrack.distanceType

    const power = stats.power.final
    const guts = stats.guts.final
    const strategySpeedCoeff = {"runner": 0.8, "oonige": 0.2, "leader": 1, "betweener":1, "chaser":1}

    const speedCoeff = strategySpeedCoeff[umaStrategy]
    const targetSpeedIncrease = ((Math.pow(power,1500),0.5)*0.2 + Math.pow((guts/3000),0.2))*0.1*speedCoeff

    const stratStamCoefficient = {"runner": 1.2, "oonige": 1.5, "leader": 1, "betweener":1, "chaser":1}
    const distanceCoefficients = [
  { limit: 1401, coeff: 0.3 },
  { limit: 1801, coeff: 0.3 },
  { limit: 2101, coeff: 0.5 },
  { limit: 2201, coeff: 0.8 },
  { limit: 2401, coeff: 1.0 },
  { limit: 2601, coeff: 1.1 },
  { limit: Infinity, coeff: 1.2 }, // catch-all for >= 2601
    ];

    function getDistanceCoeff(distance) {
  const rule = distanceCoefficients.find(r => distance < r.limit);
  return rule ? rule.coeff : 1; 
    }

    const stamCoeff = stratStamCoefficient[umaStrategy]
    const distCoeff = getDistanceCoeff(courseDist)
    const stamConsumption = 20*(stamCoeff*distCoeff)

    return {targetSpeed: targetSpeedIncrease.toFixed(2), stamConsumption: stamConsumption.toFixed(2)}

}

export function staminaKeep(stats) {
    const wisdom = stats.int.final

    const keepChance = 0.30 * (wisdom/1000 + Math.pow(wisdom,0.03))

    return (keepChance*100).toFixed(2)

}

export function staminaLimitBreak(stats) {
    const stamina = stats.stamina.final
    const courseDist = store.getState().calcsTrack.distance

    if (stamina < 1200) {
        return 0
    }

    function getDistanceFactor(courseDist) {
  const dist = Number(courseDist); 

  if (dist < 2101) return 0.0;
  if (dist < 2201) return 0.5;
  if (dist < 2401) return 1.0;
  if (dist < 2601) return 1.2;
  return 1.5; // >= 2601
    }

    const distCoeff = getDistanceFactor(courseDist)


    const targetSpeedIncrease = Math.sqrt(stamina - 1200) *0.085 * distCoeff
    
    return targetSpeedIncrease.toFixed(2)
}