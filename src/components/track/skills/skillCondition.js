const activateCountAll = (course, skill) => {
  const { distance } = course;
  return [{ start: 0, end: distance }];
};

const activateCountEndAfter = (course, skill) => {
  const { distance } = course;

  return [{ start: (2 * distance) / 3, end: distance }];
};

const activateCounterLaterHalf = (course, skill) => {
  const { distance } = course;

  return [{ start: distance / 2, end: distance }];
};

const activateCountMiddle = (course, skill) => {
  const { distance } = course;

  return [{ start: distance / 3, end: (2 * distance) / 3 }];
};

const activateCountStart = (course, skill) => {
  const { distance } = course;

  return [{ start: 0, end: distance / 3 }];
};

const distanceType = (course, skill) => {
  const { distance, distanceType } = course;
  const value = getNumber(skill);

  if (distanceType == value) {
    return [{ start: 0, end: distance }];
  } else return false;
};

const allCornerRandom = (course, skill) => {
  const { corners } = course;
  const addCornerEnds = corners.map((x) => ({ ...x, end: x.start + x.length }));
  return addCornerEnds;
};

const always = (course, skill) => {
  return [{ start: 0, end: 0 }];
};

const changeOrderUpEndAfter = (course, skill) => {
  const { distance } = course;
  const getFinalLeg = getPhasePoints(distance)[2];
  const { start } = getFinalLeg;

  return [{ start: start, end: distance }];
};

const changeOrderUpFinalCornerAfter = (course, skill) => {
  const { corners, distance } = course;

  const getLastCorner = corners[corners.length - 1];

  return [{ start: getLastCorner.start, end: distance }];
};

const changeOrderUpMiddle = (course, skill) => {
  const { distance } = course;
  const getMidLeg = getPhasePoints(distance)[1];
  const { start, end } = getMidLeg;

  return [{ start: start, end: end }];
};

const competeFightCount = (course, skill) => {
  const { straights } = course;
  const value = getNumber(skill);
  let getFinalStraight = straights[straights.length - 1];

  if (value > 0) {
    return [getFinalStraight];
  } else {
    return [{ start: 0, end: getFinalStraight["start"] }];
  }
};
const corner = (course, skill) => {
  const { corners, distance } = course;
  let output;
  const value = getNumber(skill);

  let addCornerEnds = corners.map((x) => ({ ...x, end: x.start + x.length }));

  if (skill == "corner!=0") {
    output = addCornerEnds;
  } else if (skill == "corner==0") {
    output = ladderFill(addCornerEnds, distance);
  } else {
    output = [addCornerEnds[value - 1]];
  }

  if (!output) return false;
  else return output;
};

const cornerRandom = (course, skill) => {
  const { corners, distance } = course;
  let output;
  const value = getNumber(skill);

  let addCornerEnds = corners.map((x) => ({ ...x, end: x.start + x.length }));

  if (addCornerEnds.length > 4) {
    addCornerEnds = addCornerEnds.slice(-4);
  }

  if ([addCornerEnds[value - 1]]) {
    output = [addCornerEnds[value - 1]];
  }

  if (!output) return false;
  else return output;
};

const courseDistance = (course, skill) => {
  const { distance } = course;
  const value = getNumber(skill);
  const operator = getOperator(skill);

  if (operatorCheck[operator](value, distance)) {
    return [{ start: 0, end: distance }];
  } else return;
};

const distanceRate = (course, skill) => {
  const { distance } = course;
  const value = (distance * getNumber(skill)) / 100;
  const operator = getOperator(skill);

  let output = operatorEvaluate[operator](value, distance);

  return [output];
};

const distanceRateAfterRandom = (course, skill) => {
  const { distance } = course;
  const value = (distance * getNumber(skill)) / 100;
  let operator = getOperator(skill);

  if (operator === "==") {
    operator = ">=";
  }

  let output = operatorEvaluate[operator](value, distance);

  return [output];
};

const downSlopeRandom = (course, skill) => {
  const { slopes } = course;

  const downSlopes = slopes.filter((x) => x.slope <= 0);

  const slopeEnds = downSlopes.map((x) => ({ ...x, end: x.start + x.length }));

  return slopeEnds;
};

const groundType = (course, skill) => {
  const { surface, distance } = course; //1 = turf, 2 = dirt
  const value = getNumber(skill);

  if (surface == value) {
    return [{ start: 0, end: distance }];
  } else return false;
};

const isBasisDistance = (course, skill) => {
  const { distance } = course; //0 (non-core), 1 (core)
  const value = getNumber(skill);

  if (
    (value == 1 && distance % 400 === 0) ||
    (value == 0 && distance % 400 !== 0)
  ) {
    return [{ start: 0, end: distance }];
  } else return false;
};

const isDirtGrade = (course, skill) => {
  const { raceTrackId, distance } = course;
  const value = getNumber(skill);

  const dirtGrades = [10101, 10103, 10104, 10105]; //Kawasaki, Funabashi, Morioka, or Ooi
  if (value == 1 && dirtGrades.some((x) => x === raceTrackId)) {
    return [{ start: 0, end: distance }];
  } else return;
};

const isFinalCorner = (course, skill) => {
  const { corners, distance } = course;
  const value = getNumber(skill);

  const finalCorner = corners[corners.length - 1];
  const { start, length } = finalCorner;

  if (value == 1) {
    return [{ start: start, end: distance }];
  } else {
    return [{ start: 0, end: start }];
  }
};

const isFinalCornerLaterHalf = (course, skill) => {
  const { corners } = course;
  const value = getNumber(skill);

  const finalCorner = corners[corners.length - 1];
  const { start, length } = finalCorner;
  if (value == 1) {
    return [{ start: start + length / 2, end: start + length }];
  } else return;
};

const isFinalCornerRandom = (course, skill) => {
  const { corners } = course;
  const value = getNumber(skill);

  const finalCorner = corners[corners.length - 1];
  const { start, length } = finalCorner;

  if (value == 1) {
    return [{ start: start, end: start + length }];
  } else return;
};

const isLastStraight = (course, skill) => {
  const { straights } = course;
  const value = getNumber(skill);

  const finalStraight = straights[straights.length - 1];
  const { start, end } = finalStraight;

  if (value == 1) {
    return [{ start: start, end: end }];
  } else return;
};

const isLastStraightOnetime = (course, skill) => {
  const { straights } = course;
  const value = getNumber(skill);

  const finalStraight = straights[straights.length - 1];
  const { start, end } = finalStraight;

  if (value == 1) {
    return [{ start: start, end: start }];
  } else return;
};

const isLastSpurt = (course, skill) => {
  const { distance } = course;
  const value = getNumber(skill);

  const finaLegStart = Math.round((2 * distance) / 3);

  if (value == 1) {
    return [{ start: finaLegStart, end: distance }];
  } else return;
};

const lastStraightRandom = (course, skill) => {
  const { straights } = course;
  const value = getNumber(skill);

  const finalStraight = straights[straights.length - 1];
  const { start, end } = finalStraight;

  if (value == 1) {
    return [{ start: start, end: end }];
  } else return;
};

const lastspurt = (course, skill) => {
  const { distance } = course;

  const finaLegStart = Math.round((2 * distance) / 3);

  return [{ start: finaLegStart, end: distance }];
};

const phase = (course, skill) => {
  const { distance } = course;
  const value = getNumber(skill);
  const operator = getOperator(skill);

  const phases = [0, 1, 2, 3];
  const phaseCheck = phases.filter((x) => operatorCheck[operator](x, value));
  const phaseArray = getPhasePoints(distance);

  //Get start of first phase
  const { start } = phaseArray[phaseCheck[0]];
  //get end of last phase
  const { end } = phaseArray[phaseCheck[phaseCheck.length - 1]];

  return [{ start: start, end: end }];
};

const phaseCornerRandom = (course, skill) => {
  const { distance, corners } = course;
  const value = getNumber(skill);
  const operator = getOperator(skill);

  const phases = [0, 1, 2, 3];
  const phaseCheck = phases.filter((x) => operatorCheck[operator](x, value));

  const phaseArray = getPhasePoints(distance);
  //Get start of first phase
  const { start: phaseStart } = phaseArray[phaseCheck[0]];
  //get end of last phase
  const { end: phaseEnd } = phaseArray[phaseCheck[phaseCheck.length - 1]];

  const cornersArray = corners.map((x) => {
    let cornerEnd = x.start + x.length;
    let { start: cornerStart } = x;

    //Corner starts before phase starts but ends inside phase
    if (
      cornerStart <= phaseStart &&
      cornerEnd >= phaseStart &&
      cornerEnd <= phaseEnd
    ) {
      return { start: phaseStart, end: cornerEnd };
    }
    //Corner starts inside phase but ends after phase ends
    else if (
      cornerStart >= phaseStart &&
      cornerStart <= phaseEnd &&
      cornerEnd >= phaseEnd
    ) {
      return { start: cornerStart, end: phaseEnd };
    }
    //Corner starts and end remains inside phase
    else if (cornerStart >= phaseStart && cornerEnd <= phaseEnd) {
      return { start: cornerStart, end: cornerEnd };
    }
    //Return fail if none of above conditions remain
    else {
      return { start: 0, end: 0 };
    }
  });

  return cornersArray;
};

const phaseFirstHalfRandom = (course, skill) => {
  const { distance } = course;
  const value = getNumber(skill);
  const operator = getOperator(skill);

  const phases = [0, 1, 2, 3];
  const phaseCheck = phases.filter((x) => operatorCheck[operator](x, value));

  const phaseArray = getPhasePoints(distance);
  //Get start of first phase
  const { start } = phaseArray[phaseCheck[0]];
  //get end of last phase
  const { end } = phaseArray[phaseCheck[phaseCheck.length - 1]];

  return [{ start: start, end: start + (end - start) / 2 }];
};

const phaseFirstQuarterRandom = (course, skill) => {
  const { distance } = course;
  const value = getNumber(skill);
  const operator = getOperator(skill);

  const phases = [0, 1, 2, 3];
  const phaseCheck = phases.filter((x) => operatorCheck[operator](x, value));

  const phaseArray = getPhasePoints(distance);
  //Get start of first phase
  const { start } = phaseArray[phaseCheck[0]];
  //get end of last phase
  const { end } = phaseArray[phaseCheck[phaseCheck.length - 1]];

  return [{ start: start, end: end / 4 }];
};

const phaseLaterHalfRandom = (course, skill) => {
  const { distance } = course;
  const value = getNumber(skill);
  const operator = getOperator(skill);

  const phases = [0, 1, 2, 3];
  const phaseCheck = phases.filter((x) => operatorCheck[operator](x, value));

  const phaseArray = getPhasePoints(distance);
  //Get start of first phase
  const { start } = phaseArray[phaseCheck[0]];
  //get end of last phase
  const { end } = phaseArray[phaseCheck[phaseCheck.length - 1]];

  return [{ start: start + (end - start) / 2, end: end }];
};

const phaseRandom = (course, skill) => {
  const { distance } = course;
  const value = getNumber(skill);
  const operator = getOperator(skill);

  const phases = [0, 1, 2, 3];
  const phaseCheck = phases.filter((x) => operatorCheck[operator](x, value));

  const phaseArray = getPhasePoints(distance);
  //Get start of first phase
  const { start } = phaseArray[phaseCheck[0]];
  //get end of last phase
  const { end } = phaseArray[phaseCheck[phaseCheck.length - 1]];

  return [{ start: start, end: end }];
};

const remainingDistance = (course, skill) => {
  const { distance } = course;
  const value = getNumber(skill);
  const operator = getOperator(skill);

  let output;

  if (operator == "==") {
    output = { start: distance - value, end: distance - value };
  } else if (operator == "<=" || operator == "<") {
    output = { start: distance - value, end: distance };
  } else if (operator == ">=" || operator == ">") {
    output = { start: 0, end: distance - value };
  }

  return [output];
};

const rotation = (course, skill) => {
  const { turn, distance } = course;
  const value = getNumber(skill);

  if (turn == value) {
    return [{ start: 0, end: distance }];
  } else return false;
};

const slope = (course, skill) => {
  const { slopes, distance } = course;
  let slopeArray = slopes;
  let output;
  const value = getNumber(skill);

  let addSlopeEnds = slopeArray.map((x) => ({ ...x, end: x.start + x.length }));

  if (value == 0) {
    output = ladderFill(addSlopeEnds, distance);
  } else if (value == 1) {
    let upSlopes = slopes.filter((x) => x.slope > 0);

    output = upSlopes.map((x) => ({ ...x, end: x.start + x.length }));
  } else if (value == 2) {
    let downSlopes = slopes.filter((x) => x.slope < 0);

    output = downSlopes.map((x) => ({ ...x, end: x.start + x.length }));
  }

  if (output.length === 0 || !output) return false;
  else return output;
};

const straightRandom = (course, skill) => {
  const { straights } = course;

  return straights;
};

const trackId = (course, skill) => {
  const { raceTrackId, distance } = course;
  const value = getNumber(skill);

  if (raceTrackId == value) {
    return [{ start: 0, end: distance }];
  }
};

const upSlopeRandom = (course, skill) => {
  const { slopes, distance } = course;
  const value = getNumber(skill);

  if (value == 1) {
    let upSlopes = slopes.filter((x) => x.slope > 0);

    const slopeEnds = upSlopes.map((x) => ({ ...x, end: x.start + x.length }));
    return slopeEnds;
  }
};

export const conditionMap = {
  activate_count_all: activateCountAll,
  activate_count_all_team: activateCountAll,
  activate_count_end_after: activateCountEndAfter,
  activate_count_heal: activateCountAll,
  activate_count_later_half: activateCounterLaterHalf,
  activate_count_middle: activateCountMiddle,
  activate_count_start: activateCountStart,
  all_corner_random: allCornerRandom,
  always: always,
  change_order_up_end_after: changeOrderUpEndAfter,
  change_order_up_finalcorner_after: changeOrderUpFinalCornerAfter,
  change_order_up_middle: changeOrderUpMiddle,
  compete_fight_count: competeFightCount,
  corner: corner,
  corner_random: cornerRandom,
  course_distance: courseDistance,
  distance_rate: distanceRate,
  distance_rate_after_random: distanceRateAfterRandom,
  distance_type: distanceType,
  down_slope_random: downSlopeRandom,
  ground_type: groundType,
  is_basis_distance: isBasisDistance,
  is_dirtgrade: isDirtGrade,
  is_finalcorner: isFinalCorner,
  is_finalcorner_laterhalf: isFinalCornerLaterHalf,
  is_finalcorner_random: isFinalCornerRandom,
  is_last_straight: isLastStraight,
  is_last_straight_onetime: isLastStraightOnetime,
  is_lastspurt: isLastSpurt,
  last_straight_random: lastStraightRandom,
  lastspurt: lastspurt,
  phase: phase,
  phase_corner_random: phaseCornerRandom,
  phase_firsthalf_random: phaseFirstHalfRandom,
  phase_firstquarter_random: phaseFirstQuarterRandom,
  phase_laterhalf_random: phaseLaterHalfRandom,
  phase_random: phaseRandom,
  remain_distance: remainingDistance,
  rotation: rotation,
  slope: slope,
  straight_random: straightRandom,
  track_id: trackId,
  up_slope_random: upSlopeRandom,
};

////all_corner_random
////always
////compete_fight_count
////corner
////corner_random
////course_distance
////distance_rate
////distance_rate_after_random
////distance_type <- fix
////down_slope_random
//grade (idk about this)
////ground_type
////is_basis_distance
////is_dirtgrade
////is_finalcorner
////is_finalcorner_laterhalf
////is_finalcorner_random
//i//s_last_straight
////is_last_straight_onetime
////is_lastspurt
////last_straight_random
////lastspurt
////phase
////phase_corner_random
////phase_firsthalf_random
////phase_firstquarter_random
////phase_laterhalf_random
////phase_random
////remain_distance
////rotation
////slope
//straight_front_type
////straight_random
////track_id
////up_slope_random

const getNumber = (string) => {
  return string.replace(/([^\d])+/g, "");
};
const getOperator = (string) => {
  return string.replace(/([^><=])+/g, "");
};

const operatorCheck = {
  "<=": function (skillValue, course) {
    return skillValue <= course;
  },
  ">=": function (skillValue, course) {
    return skillValue >= course;
  },
  "==": function (skillValue, course) {
    return skillValue == course;
  },
  "<": function (skillValue, course) {
    return skillValue < course;
  },
  ">": function (skillValue, course) {
    return skillValue > course;
  },
};

const operatorEvaluate = {
  "<=": function (skillValue, course) {
    return { start: 0, end: skillValue };
  },
  ">=": function (skillValue, course) {
    return { start: skillValue, end: course };
  },
  "==": function (skillValue, course) {
    return { start: skillValue, end: skillValue };
  },
  "<": function (skillValue, course) {
    return { start: 0, end: skillValue };
  },
  ">": function (skillValue, course) {
    return { start: skillValue, end: course };
  },
};

const getPhasePoints = (distance) => {
  const phases = {
    0: { start: 0, end: Math.round(distance / 6) },
    1: { start: Math.round(distance / 6), end: Math.round((2 * distance) / 3) },
    2: {
      start: Math.round((2 * distance) / 3),
      end: Math.round((5 * distance) / 6),
    },
    3: { start: Math.round((5 * distance) / 6), end: distance },
  };

  return phases;
};

const ladderFill = (distanceArray, distance) => {
  let array = [];

  let startPoint = 0;

  for (let i = 0; i < distanceArray.length; i++) {
    const { start, end } = distanceArray[i];

    if (startPoint === start) {
      startPoint = end;
      if (i === distanceArray.length - 1) {
        array.push({ start: startPoint, end: distance });
      }
      continue;
    }

    let ladderPoints = { start: startPoint, end: start };

    startPoint = end;
    array.push(ladderPoints);
  }

  return array;
};
