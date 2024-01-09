import { abilityMap } from "../data/abilityTypes";
import "./skillDetailDisplay.scss";
import digitalNerd from "../../../assets/digital-nerd.png";
const digitalInsults = ["nerd", "bozo", "dumbass"];

const SkillDisplay = ({ skill, course, triggers }) => {
  if (!skill) return;

  const {
    condition_1,
    condition_2,
    skill_name,
    skill_name_english,
    ability_type_1_1,
    ability_type_1_2,
    ability_type_1_3,
    ability_type_2_1,
    ability_type_2_2,
    ability_type_2_3,
    float_ability_value_1_1,
    float_ability_value_1_2,
    float_ability_value_1_3,
    float_ability_value_2_1,
    float_ability_value_2_2,
    float_ability_value_2_3,
    float_ability_time_1,
    float_ability_time_2,
    icon_id,
  } = skill;

  const { distance } = course;

  let firstAbilityArray = [
    { ability: ability_type_1_1, effect: float_ability_value_1_1 },
    { ability: ability_type_1_2, effect: float_ability_value_1_2 },
    { ability: ability_type_1_3, effect: float_ability_value_1_3 },
  ].filter((x) => parseInt(x.ability) !== 0);

  let secondAbilityArray = [
    { ability: ability_type_2_1, effect: float_ability_value_2_1 },
    { ability: ability_type_2_2, effect: float_ability_value_2_2 },
    { ability: ability_type_2_3, effect: float_ability_value_2_3 },
  ].filter((x) => parseInt(x.ability) !== 0);

  let conditionDetails = [
    {
      condition: condition_1,
      abilityArray: firstAbilityArray,
      duration: float_ability_time_1,
    },
    {
      condition: condition_2,
      abilityArray: secondAbilityArray,
      duration: float_ability_time_2,
    },
  ];

  const rarity = icon_id.toString().slice(4);

  const newLineCondition = (text) => {
    const replaceAnd = text.replace(/&/g, "\n&");
    const replaceOr = replaceAnd.replace(/@/g, "\n@\n");

    return replaceOr;
  };

  const getAbility = (paramater) => {
    const { ability, effect } = paramater;

    return abilityMap[ability](effect);
  };

  return (
    <div
      className={`race-track-skill-box-container race-track-skill-box-${rarity}`}
    >
      <div className="race-track-skill-header">
        <div className="race-track-skill-icon">
          <img
            src={`http://gametora.com/images/umamusume/skill_icons/utx_ico_skill_${icon_id}.png`}
            alt="skill"
          />
        </div>
        <div className="race-track-skill-name-container">
          <div className="race-track-skill-JPname">{skill_name}</div>
          <div className="race-track-skill-ENname">{skill_name_english}</div>
        </div>
      </div>
      <div className="race-track-details-container">
        {conditionDetails.map(
          (x, index) =>
            x.condition && (
              <div className="race-track-details-skill">
                <div className="race-track-skill-condition">
                  <span style={{ fontWeight: 750 }}>{`Condition ${
                    index + 1
                  }`}</span>
                  <p>{newLineCondition(x.condition)}</p>
                </div>
                <div className="race-track-skill-effect">
                  <span style={{ fontWeight: 750 }}>Effect</span>
                  {x.abilityArray.map((ability) => (
                    <p>{getAbility(ability)}</p>
                  ))}
                </div>
                <div className="race-track-skill-duration">
                  <div className="race-track-skill-base-duration">
                    <p>
                      Base Duration:{" "}
                      {x.duration > 0 ? x.duration / 10000 + "s" : "Infinite"}
                    </p>
                  </div>
                  <div className="race-track-skill-actual-duration">
                    <p>
                      Actual Duration:{" "}
                      {x.duration > 0
                        ? Math.round(
                            (x.duration / 10000) * (distance / 1000) * 100
                          ) /
                            100 +
                          "s"
                        : "Infinite"}
                    </p>
                  </div>
                </div>{" "}
              </div>
            )
        )}
      </div>
      {triggers && (
        <div
          className={`skill-overlay-digital-nerd skill-overlay-digital-nerd-${triggers}`}
        >
          <img src={digitalNerd} alt="digital-nerd" />
          <div className="digital-text">
            <p className="digital-text-comment">Skill does not trigger,</p>
            <p className="digital-text-insult">NERD</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillDisplay;
