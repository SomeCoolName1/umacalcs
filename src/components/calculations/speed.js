import { useSelector } from "react-redux";

const umaTargetSpeed = (baseSpeed, finalStat, speedCI, phase) => {
  let legSpeed;
  let uphillSpeedReduc = 0;
  let speed = finalStat.speed.final;
  let guts = finalStat.guts.final;

  const { openingLeg, middleLeg, finalLeg } = speedCI;
};

export default umaTargetSpeed;
