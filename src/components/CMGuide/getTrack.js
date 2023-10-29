import { useEffect, useState } from "react";
import "./getTrack.scss";
import { Link } from "react-router-dom";

const TrackInfo = ({ info, data, supportCardsData }) => {
  let [supportCards, setSupportCards] = useState(false);

  const getSupportCards = () => {
    if (!info.keyWord) return;
    for (let i = 0; i < data.length; i++) {
      if (data[i].skill_name === info.keyWord) {
        data[i].support_card_ids = sepCardIds(data[i].support_card_ids);

        setSupportCards(data[i]);
      }
    }
  };

  //Match the ID with actual data
  const matchSupportId = (id) => {
    for (let i = 0; i < supportCardsData.length; i++) {
      if (supportCardsData[i].support_card_id == id) {
        return supportCardsData[i].support_card_name_english
          .replace(/\s+/g, "-")
          .toLowerCase();
      }
    }
  };

  const sepCardIds = (id) => {
    if (id.constructor === Array) return;
    const array = id.split(",");
    return array.filter((x) => x >= 20000);
  };

  useEffect(() => {
    if (!info) return;
    getSupportCards();
  }, [data]);

  return (
    <div className="track-info">
      <div className="track-info-header">
        <h3>{info.name}</h3>
        <p>{info.detail}</p>
      </div>

      {supportCards && (
        <div className="track-info-skill-container">
          <div className="track-skill-image">
            <img
              src={`http://gametora.com/images/umamusume/skill_icons/utx_ico_skill_${supportCards.icon_id}.png`}
              alt="skill"
            />
            <div className="track-skill-name-container">
              <div className="track-skill-JPname">
                {supportCards.skill_name}
              </div>
              <div className="track-skill-ENname">
                {supportCards.skill_name_english}
              </div>
            </div>
          </div>
          <h3>Support (Hints)</h3>
          <div className="track-skill-hints-list">
            {supportCards.support_card_ids.map((cardId) => (
              <Link
                to={`https://gametora.com/umamusume/supports/${cardId}-${matchSupportId(
                  cardId
                )}`}
              >
                <img
                  src={`https://gametora.com/images/umamusume/supports/support_card_s_${cardId}.png`}
                  alt="skill-hints"
                  className="support-card-images"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackInfo;
