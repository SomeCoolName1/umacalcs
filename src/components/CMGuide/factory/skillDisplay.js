import { useRef, useState } from "react";
import "./skillDisplay.scss";

const SkillDisplay = ({
  skill,
  rarity,
  eventCards,
  comments,
  uniqueUma,
  recStrategy,
}) => {
  const [show, setShow] = useState("false");
  const skillPopup = useRef(null);

  const closePopup = (e) => {
    if (skillPopup.current && show && !skillPopup.current.contains(e.target)) {
      setShow(false);
    }
  };

  document.addEventListener("mousedown", closePopup);

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
      ref={skillPopup}
    >
      {recStrategy && (
        <div className={`rec-skill-details-strategy-container`}>
          {recStrategy.map((strat) => (
            <div className={`rec-skill-details-strategy-bubble`}>
              <p>{strat}</p>
            </div>
          ))}
        </div>
      )}
      <div className={`rec-skill-details-container details-${show}`}>
        <div className={`rec-skill-details rec-skill-details-info`}>
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
            {skill.skill_name ? <h4>{skill.skill_name}</h4> : "Undefined"}
          </div>
          <div className="rec-skill-ENname">
            {skill.skill_name_english ? (
              <h4>{skill.skill_name_english}</h4>
            ) : (
              "No translation yet"
            )}
          </div>
          <div className="rec-skill-events">
            {eventCards && (
              <>
                <p>Support (Events/Hints)</p>
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
            {skill.support_card_ids &&
              typeof skill.support_card_ids === Object && (
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
                <p style={{ fontWeight: 750 }}>Condition 1</p>
                <p>{newLineCondition(skill.condition_1)}</p>
              </>
            )}
            {skill.condition_2 && (
              <>
                <p style={{ fontWeight: 750 }}>Condition 2</p>{" "}
                <p>{newLineCondition(skill.condition_2)}</p>
              </>
            )}
          </div>
          <div
            className={`rec-${rarity}-skill-description rec-skill-description`}
          >
            <p>Description</p>
            <p>{skill.skill_desc_english}</p>
          </div>
        </div>
        <div className={`rec-skill-comment-container rec-skill-details-info`}>
          <div className={`rec-skill-comment`}>
            <p>Comment</p>
            {comments ? <p>{comments}</p> : <p>No Comment</p>}
          </div>
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
        {rarity === "unique" && (
          <div className="rec-front-unique-uma-image">
            <img
              src={`http://gametora.com/images/umamusume/characters/chara_stand_${uniqueShortId(
                uniqueUma.id
              )}_${uniqueUma.id}.png`}
              alt="uma"
              style={{ height: "50px", width: "auto" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillDisplay;
