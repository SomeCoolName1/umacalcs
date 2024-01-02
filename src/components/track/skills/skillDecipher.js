import { conditionMap } from "./skillCondition";

export const skillCheck = (course, skill) => {
  if (!skill) return;

  const { condition_1, condition_2 } = skill;
  let triggerPoints = [];

  const conditions = [condition_1, condition_2];
  // const conditions = ["slope==2"];

  //Seperate skill conditions
  let conditionsArray = conditions.map((skill) => breakSkillCondition(skill));

  //Iterate over Condition 1 and Condition 2
  for (let i = 0; i < conditionsArray.length; i++) {
    if (!conditionsArray[i]) continue;
    const currentCondition = conditionsArray[i];

    //Iterate over any potential @s
    for (let j = 0; j < currentCondition.length; j++) {
      let conditionGroup = currentCondition[j];
      let groupArray = [];

      //Finally iterate over the actual conditions
      for (let k = 0; k < conditionGroup.length; k++) {
        if (!conditionGroup[k]) return;
        let condition = conditionGroup[k];
        let conditionType = condition.replace(/([^a-zA-Z_])+/g, "");

        let getTriggerPoints =
          conditionMap[conditionType] &&
          conditionMap[conditionType](course, condition);

        if (getTriggerPoints === undefined) continue;

        if (getTriggerPoints === false) {
          //empty array because false statement means no distance
          groupArray = [];
          break;
        }

        // groupArray = groupArray.concat(getTriggerPoints);

        groupArray.push(getTriggerPoints);
      }

      triggerPoints.push(groupArray);
    }
  }

  const removeUndefined = triggerPoints.map((x) =>
    x.filter((y) => y !== undefined)
  );

  const getOverlaps = removeUndefined.map((x) => overlap(x));
  // console.log(getOverlaps);

  return getOverlaps;
};

const breakSkillCondition = (skill) => {
  if (!skill) return;

  let skillCondition = skill;

  let splitOrCause = skillCondition.split("@");
  let splitAndCause = splitOrCause.map((skill) => skill.split("&"));

  return splitAndCause;
};

const overlap = (conditionGroup) => {
  if (!conditionGroup || conditionGroup.length === 0)
    return [{ start: 0, end: 0 }];
  let array = [];
  console.log("origainl croupo", conditionGroup);

  //Case Scenario, 3 groups
  //[ [{}] , [{}] , [{}] ]
  let firstGroup = conditionGroup[0];
  let firstStart;
  let firstEnd;

  for (let i = 0; i < firstGroup.length; i++) {
    let { start, end } = firstGroup[i];

    if (!firstStart) {
      firstStart = start;
    }
    if (!firstEnd) {
      firstEnd = end;
    }

    for (let h = 0; h < conditionGroup.length; h++) {
      let currentGroup = conditionGroup[h];

      if (firstGroup === currentGroup) {
        if (conditionGroup.length === 1) {
          return firstGroup;
        }
        continue;
      }

      for (let j = 0; j < currentGroup.length; j++) {
        let startPoint = Math.max(firstStart, currentGroup[j].start);
        let endPoint = Math.min(firstEnd, currentGroup[j].end);

        console.log("----------------");
        console.log("first", startPoint, endPoint);
        console.log("current", currentGroup[j]);
        console.log("----------------");

        if (endPoint <= startPoint) {
          firstStart = start;
          firstEnd = end;
          continue;
        }

        firstStart = startPoint;
        firstEnd = endPoint;
      }
    }

    array.push({ start: firstStart, end: firstEnd });
    firstStart = null;
    firstEnd = null;
  }
  console.log(array);

  return array;
};

// //Get the largest value of starting points
// let start = Math.max(...condition.map((x) => x.start));

// //Get smalelst value of ending points
// let end = Math.min(...condition.map((x) => x.end));
