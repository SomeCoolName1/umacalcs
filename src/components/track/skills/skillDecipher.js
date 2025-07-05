import { conditionMap } from "./skillCondition";

export const skillCheck = (course, skill) => {
  if (!skill) return;

  const { condition_1, condition_2 } = skill;
  let triggerPoints = [];

  const conditions = [condition_1, condition_2];
  // const conditions = ["activate_count_start>=3"];

  console.log(conditions)

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

       
        if (getTriggerPoints === false ) {
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
  if (!conditionGroup || conditionGroup.length === 0 || conditionGroup[0] == undefined) return false;


  const intersectRanges = (a, b) =>{
    let start = Math.max(a.start, b.start);
    let end=Math.min(a.end,b.end);
    return start < end ? {start, end} : false;
  }

  let result = conditionGroup[0]

  for (let i =1; i < conditionGroup.length;i++) {
    let newResult = []

    if (!conditionGroup[i]) {
      newResult.push(false)
      break
    }

    let current = conditionGroup[i];
    

    for (const intervalA of result){
      for (const intervalB of current) {
            const intersected = intersectRanges(intervalA, intervalB);
        if (intersected) newResult.push(intersected);

      }
    }
        result = newResult;
    if (result.length === 0) break;


  }
    return result;
};


//  //Case Scenario, 3 groups
//   //[ [{}] , [{}] , [{}] ]
//   let firstGroup = conditionGroup[0];
//   let firstStart;
//   let firstEnd;

//   for (let i = 0; i < firstGroup.length; i++) {
//     //If condition is false, continue
//     if (!firstGroup || !firstGroup[i]) continue;

//     let { start, end } = firstGroup[i];

//     if (!firstStart) {
//       firstStart = start;
//     }
//     if (!firstEnd) {
//       firstEnd = end;
//     }

//     for (let h = 0; h < conditionGroup.length; h++) {
//       if (!conditionGroup[h]) continue;

//       let currentGroup = conditionGroup[h];

//       if (firstGroup === currentGroup) {
//         if (conditionGroup.length === 1) {
//           return firstGroup;
//         }
//         continue;
//       }

//       for (let j = 0; j < currentGroup.length; j++) {
//         if (!currentGroup[j]) continue;

//         let startPoint = Math.max(firstStart, currentGroup[j].start);
//         let endPoint = Math.min(firstEnd, currentGroup[j].end);

//         if (endPoint < startPoint) {
//           firstStart = start;
//           firstEnd = end;
//           array.push(false);
//           continue;
//         }

//         firstStart = startPoint;
//         firstEnd = endPoint;
//         array.push({ start: firstStart, end: firstEnd });

//         firstStart = start;
//         firstEnd = end;
//       }
//     }

//     firstStart = null;
//     firstEnd = null;
//   }

//   return array;