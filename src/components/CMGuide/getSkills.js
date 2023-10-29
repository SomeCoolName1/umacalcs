import { useEffect, useState } from "react";
import "./getSkills.scss";
import { fetchSkills } from "./data/fetchData";
import SkillDisplay from "./factory/skillDisplay";

//アングリング×スキーミング
//まっしぐら

const DisplaySkill = (skill, data) => {
  const [goldData, setGoldData] = useState({});
  const [whiteData, setWhiteData] = useState({});

  const { goldSkill, goldEventCards, whiteEventCards, comments } = skill;

  const getSkills = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].skill_name === goldSkill) {
        data[i].skill_desc_english = skillDesc(data[i].skill_desc_english);

        setGoldData(data[i]);

        if (data[i + 1]) {
          data[i + 1].skill_desc_english = skillDesc(
            data[i + 1].skill_desc_english
          );
          setWhiteData(data[i + 1]);
        }

        data[i + 1].support_card_ids = sepCardIds(data[i + 1].support_card_ids);

        return;
      }
    }
  };

  const sepCardIds = (id) => {
    if (id.constructor === Array) return;
    const array = id.split(",");
    return array.filter((x) => x >= 20000);
  };

  const skillDesc = (desc) => {
    if (!desc) return;
    const output = desc.replace(/<size=18>|<b>|<\/b>|\\n|<\/size>/gi, "");

    return output;
  };

  useEffect(() => {
    console.log("displaySkills check");
    if (!skill || !data) return;
    getSkills();
  }, [data]);

  return (
    <div className="rec-single-skill-container">
      <SkillDisplay
        skill={goldData}
        rarity={"gold"}
        eventCards={goldEventCards}
        comments={comments}
      />
      {whiteData && (
        <SkillDisplay
          skill={whiteData}
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
