import { useEffect, useState } from "react";
import SkillDisplay from "./factory/skillDisplay";
import { TextCleaner } from "./factory/textCleaner";

const DisplayInherit = (uma, cardRarityData, skillSetData, skillsData) => {
  let [unique, setUnique] = useState(false);

  //Gets Unique skill ID from ID from SkillSets
  const getSkills = () => {
    let umaSkillSet = findSkillSet(uma.id);

    //Then find the uniqueskillset from skillSetData
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
        skillsData[i].skill_desc_english = TextCleaner(
          skillsData[i].skill_desc_english
        );

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
          comments={uma.comments}
          uniqueUma={uma}
          recStrategy={uma.recStrategy}
        />
      )}
    </>
  );
};

export default DisplayInherit;
