import { abilityMap } from "../../../game_data/abilityTypes";
import "./skillDetailDisplay.scss";
import digitalNerd from "../../../assets/digital-nerd.png";
const digitalInsults = ["nerd", "bozo", "dumbass"];

const SkillDisplay = ({ skill, course, triggers }) => {
  if (!skill) return;

 
  const {
    condition1,
    condition2,
    skillName,
    abilityType11,
    abilityType12,
    abilityType13,
    abilityType21,
    abilityType22,
    abilityType23,
    floatAbilityValue11,
    floatAbilityValue12,
    floatAbilityValue13,
    floatAbilityValue21,
    floatAbilityValue22,
    floatAbilityValue23,
    floatAbilityTime1,
    floatAbilityTime2,
    iconId,
  } = skill;

  const { distance } = course;

  let firstAbilityArray = [
    { ability: abilityType11, effect: floatAbilityValue11 },
    { ability: abilityType12, effect: floatAbilityValue12 },
    { ability: abilityType13, effect: floatAbilityValue13 },
  ].filter((x) => parseInt(x.ability) !== 0);

  let secondAbilityArray = [
    { ability: abilityType21, effect: floatAbilityValue21 },
    { ability: abilityType22, effect: floatAbilityValue22 },
    { ability: abilityType23, effect: floatAbilityValue23 },
  ].filter((x) => parseInt(x.ability) !== 0);

  let conditionDetails = [
    {
      condition: condition1,
      abilityArray: firstAbilityArray,
      duration: floatAbilityTime1,
    },
    {
      condition: condition2,
      abilityArray: secondAbilityArray,
      duration: floatAbilityTime2,
    },
  ];

  const rarity = iconId.toString().slice(4);

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
            src={`http://gametora.com/images/umamusume/skill_icons/utx_ico_skill_${iconId}.png`}
            alt="skill"
          />
        </div>
        <div className="race-track-skill-name-container">
          <div className="race-track-skill-JPname">{skillName}</div>
         
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
