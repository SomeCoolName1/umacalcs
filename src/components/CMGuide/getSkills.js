import { useEffect, useState } from "react";
import "./getSkills.scss";
import SkillDisplay from "./factory/skillDisplay";

const DisplaySkill = ({ skill, data }) => {
  const [goldData, setGoldData] = useState([]);
  // const [whiteData, setWhiteData] = useState({});

  const { goldSkill, goldEventCards, whiteEventCards, comments } = skill;

  const getSkills = () => {
    let gold;
    let white;
    console.log(goldSkill);

    for (let i = 0; i < data.length; i++) {
      if (data[i].skill_name == goldSkill) {
        data[i].skill_name_english = skillDesc(data[i].skill_name_english);
        data[i].skill_desc_english = skillDesc(data[i].skill_desc_english);

        gold = data[i];
        let goldSkillId = data[i].skill_id;

        let findWhite = data.find((x) => goldSkillId === x.skill_id - 1);

        if (findWhite) {
          findWhite.skill_name_english = skillDesc(
            findWhite.skill_name_english
          );
          findWhite.skill_desc_english = skillDesc(
            findWhite.skill_desc_english
          );
          findWhite.support_card_ids = sepCardIds(findWhite.support_card_ids);
          white = findWhite;
        }
        return [gold, white];
      }
    }

    return [gold, white];
  };

  const sepCardIds = (id) => {
    if (id.constructor === Array) return;
    const array = id.split(",");
    return array.filter((x) => x >= 20000);
  };

  const skillDesc = (desc) => {
    if (!desc) return;
    let output = desc.replace(/<size=18>|<b>|<\/b>|\\n|\\N|<\/size>/gi, "");

    return output;
  };

  useEffect(() => {
    if (!skill || !data) return;
    setGoldData(getSkills());
    // console.log("skill", skill, "golddata:", goldData);
  }, [data]);

  return (
    <div className="rec-single-skill-container">
      {goldData[0] && (
        <SkillDisplay
          skill={goldData[0]}
          rarity={"gold"}
          eventCards={goldEventCards}
          comments={comments}
        />
      )}
      {goldData[1] && (
        <SkillDisplay
          skill={goldData[1]}
          rarity={"white"}
          eventCards={whiteEventCards}
          comments={comments}
        />
      )}
    </div>
  );
};

export default DisplaySkill;

// float_ability_time_1:Base Duration (27000 -> 2.7s)
// ​​​
// float_ability_time_2: 0
// ​​​
// float_ability_value_1_1: 3500 (0.35m/s)
// ​​​
// float_ability_value_1_2: -400 (-4% hp)
// ​​​
// float_ability_value_1_3: 0
// ​​​
// float_ability_value_2_1: 0
// ​​​
// float_ability_value_2_2: 0
// ​​​
// float_ability_value_2_3: 0

// ability_type_1_1:
//27 => Target Speed
//21 => Current Speed
//31 => Acceleration
