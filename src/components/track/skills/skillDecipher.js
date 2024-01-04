import { conditionMap } from "./skillCondition";

export const skillCheck = (course, skill) => {
  if (!skill) return;

  const { condition_1, condition_2 } = skill;
  let triggerPoints = [];

  const conditions = [condition_1, condition_2];
  // const conditions = ["distance_type==3"];

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
          groupArray = [];
          break;
        }

        groupArray.push(getTriggerPoints);
      }

      triggerPoints.push(groupArray);
    }
  }

  const removeUndefined = triggerPoints.map((x) =>
    x.filter((y) => y !== undefined)
  );

  const getOverlaps = removeUndefined.map((x) => overlap(x));

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
  if (!conditionGroup || conditionGroup.length === 0) return false;
  let array = [];
  console.log("conditionGroups", conditionGroup);

  //Case Scenario, 3 groups
  //[ [{}] , [{}] , [{}] ]
  let firstGroup = conditionGroup[0];
  let firstStart; //Start:150
  let firstEnd; //End: 200

  //Scenario that does not work
  //First Array= [{start: 100, end: 200},{start:350, end:400}]
  //Second Array: =[{start:150, end: 300},{start:350, end: 450}]
  //Third Array = [{start: 0, end: 1400}]

  //Start 150, end: 200
  //St

  //Output = [{start:150, 200}, {start: 350,400}]

  for (let i = 0; i < firstGroup.length; i++) {
    //If condition is false, continue
    if (!firstGroup) continue;

    let { start, end } = firstGroup[i];

    if (!firstStart) {
      firstStart = start;
    }
    if (!firstEnd) {
      firstEnd = end;
    }

    for (let h = 0; h < conditionGroup.length; h++) {
      if (!conditionGroup[h]) continue;

      let currentGroup = conditionGroup[h];

      if (firstGroup === currentGroup) {
        if (conditionGroup.length === 1) {
          return firstGroup;
        }
        continue;
      }

      for (let j = 0; j < currentGroup.length; j++) {
        if (!currentGroup[j]) continue;

        let startPoint = Math.max(firstStart, currentGroup[j].start);
        let endPoint = Math.min(firstEnd, currentGroup[j].end);

        if (endPoint < startPoint) {
          firstStart = start;
          firstEnd = end;
          array.push(false);
          continue;
        }

        firstStart = startPoint;
        firstEnd = endPoint;
        array.push({ start: firstStart, end: firstEnd });

        firstStart = start;
        firstEnd = end;
      }
    }

    firstStart = null;
    firstEnd = null;
  }

  return array;
};
