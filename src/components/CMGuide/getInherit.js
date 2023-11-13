import { useEffect, useState } from "react";
import SkillDisplay from "./factory/skillDisplay";

const DisplayInherit = (uma, cardRarityData, skillSetData, skillsData) => {
  let [unique, setUnique] = useState(false);

  //Gets Unique skill ID from ID from SkillSets
  const getSkills = () => {
    let umaSkillSet = findSkillSet(uma.id);

    //Then find the uniqueskillset from skillSetData
    console.log(uma.enName, umaSkillSet);
    for (let i = 0; i < skillSetData.length; i++) {
      if (skillSetData[i].id === umaSkillSet) {
        return skillSetData[i].skill_id1;
      }
    }
  };

  const findSkillSet = (id) => {
    for (let i = 0; i < cardRarityData.length; i++) {
      if (cardRarityData[i].card_id === id) {
        return cardRarityData[i].skill_set;
      }
    }
  };

  //Finds skill details from unique ID
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
