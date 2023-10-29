import { useEffect, useState } from "react";
import SkillDisplay from "./factory/skillDisplay";

const DisplayInherit = (uma, cardRarityData, skillSetData, skillsData) => {
  let [unique, setUnique] = useState(false);

  const getSkills = () => {
    let umaSkillSet;
    for (let i = 0; i < cardRarityData.length; i++) {
      if (cardRarityData[i].card_id === uma.id) {
        umaSkillSet = cardRarityData[i].skill_set;
        //Then find the uniqueskillset from skillSetData
        for (let i = 0; i < skillSetData.length; i++) {
          if (skillSetData[i].id === umaSkillSet) {
            return skillSetData[i].skill_id1;
          }
        }
      }
    }
  };

  const getUnique = (skill) => {
    for (let i = 0; i < skillsData.length; i++) {
      if (skillsData[i].skill_id === skill) {
        return skillsData[i];
      }
    }
  };

  useEffect(() => {
    if (!uma) return;
    let getUniqueId = getSkills();
    setUnique(getUnique(getUniqueId));
  }, [skillSetData]);

  return (
    <>
      {unique && (
        <SkillDisplay
          skill={unique}
          rarity={"unique"}
          eventCards={""}
          comments={""}
          uniqueUma={uma}
        />
      )}
    </>
  );
};

export default DisplayInherit;
