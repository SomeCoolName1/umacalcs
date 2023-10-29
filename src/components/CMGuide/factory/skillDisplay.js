import { useState } from "react";

const SkillDisplay = ({ skill, rarity, eventCards, comments, uniqueUma }) => {
  const [show, setShow] = useState("false");

  //Rank placements
  const newLineCondition = (text) => {
    const replaceAnd = text.replace(/&/g, "\n&");
    const replaceOr = replaceAnd.replace(/@/g, "\n@\n");

    return replaceOr;
  };

  const uniqueShortId = (id) => {
    return String(id).slice(0, -2);
  };

  return (
    <div
      className={`rec-${rarity}-skill-container rec-skill-container`}
      onClick={() => setShow((prev) => !prev)}
    >
      <div className={`rec-skill-details details-${show}`}>
        {rarity === "unique" && (
          <div className="rec-skill-unique-uma-container">
            <h4>{uniqueUma.enName}</h4>
            <div className="rec-skill-unique-uma-image">
              <img
                src={`http://gametora.com/images/umamusume/characters/chara_stand_${uniqueShortId(
                  uniqueUma.id
                )}_${uniqueUma.id}.png`}
                alt="uma"
              />
            </div>
          </div>
        )}
        <div className="rec-skill-JPname">
          {skill.skill_name ? skill.skill_name : "Undefined"}
        </div>
        <div className="rec-skill-ENname">
          {skill.skill_name_english
            ? skill.skill_name_english
            : "No translation yet"}
        </div>
        <div className="rec-skill-events">
          {eventCards && (
            <>
              <p>Support (Events)</p>
              {eventCards.map((card) => (
                <img
                  src={`http://gametora.com/images/umamusume/supports/support_card_s_${card}.png`}
                  alt="sup"
                  className="support-card-images"
                />
              ))}
            </>
          )}
        </div>
        <div className="rec-skill-hints">
          {skill.support_card_ids && (
            <>
              <p>Support (Hints)</p>
              {skill.support_card_ids.map((cardId) => (
                <img
                  src={`https://gametora.com/images/umamusume/supports/support_card_s_${cardId}.png`}
                  alt="skill-hints"
                  className="support-card-images"
                />
              ))}
            </>
          )}
        </div>
        <div className="rec-skill-condition">
          <p>Conditions</p>
          {skill.condition_1 && (
            <>
              <p>Condition 1</p>
              <p>{newLineCondition(skill.condition_1)}</p>
            </>
          )}
          {skill.condition_2 && (
            <>
              <p>Condition 2</p> <p>{newLineCondition(skill.condition_2)}</p>
            </>
          )}
        </div>
        <div
          className={`rec-${rarity}-skill-description rec-skill-description`}
        >
          <p>Description</p>
          <p>{skill.skill_desc_english}</p>
        </div>

        <div className={`rec-skill-comments`}>
          <p>Comment</p>
          {comments ? <p>{comments}</p> : <p>No Comment</p>}
        </div>
      </div>
      <div className={`rec-${rarity}-skill rec-skill-front`}>
        <div className="rec-skill-image">
          <img
            src={`http://gametora.com/images/umamusume/skill_icons/utx_ico_skill_${skill.icon_id}.png`}
            alt="skill"
          />
        </div>
        <div className="rec-skill-name-container">
          <div className="rec-skill-JPname">
            {skill.skill_name ? skill.skill_name : "Undefined"}
          </div>
          <div className="rec-skill-ENname">
            {skill.skill_name_english
              ? skill.skill_name_english
              : "No translation yet"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDisplay;
