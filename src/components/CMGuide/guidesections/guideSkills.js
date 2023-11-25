import "./guideSkills.scss";
import recBg from "../../../assets/champions_bg_2.png";
import DisplaySkill from "../getSkills";
import DisplayInherit from "../getInherit";
const GuideSkills = ({ strategies, cardRarity, skillSetData, skillsData }) => {
  return (
    <div className="CMGuide-skills-container ">
      <div className="CMGuide-skills-picture">
        <img src={recBg} />
      </div>
      <div className="CMGuide-skills-title">
        <div className="CMGuide-skills-seperator" />
        <h3>Recommended Skills</h3>
      </div>
      <div className="CMGuide-rec-skills-container">
        {strategies.map((strategy) => (
          <div
            className={`CMGuide-skills-${strategy.name} CMGuide-skills-strategy-container`}
          >
            <div
              className={`CMGuide-skills-${strategy.name}-title CMGuide-skills-strategy-title`}
            >
              <h3>{strategy.name}</h3>
            </div>
            <h3>Inherits</h3>
            <div
              className={`CMGuide-skills-${strategy.name}-inherit CMGuide-skills-rec-list`}
            >
              {strategy.inherit.length === 0 ? "None" : ""}
              {strategy.inherit.map((uma) => {
                return DisplayInherit(
                  uma,
                  cardRarity,
                  skillSetData,
                  skillsData
                );
              })}
            </div>
            <div
              className={`CMGuide-skills-rec-${strategy.name}-inherit-comment CMGuide-skills-rec-comment`}
            >
              {strategy.inhComm &&
                strategy.inhComm.map((comment) => <p>* {comment}</p>)}
            </div>
            <h3>Skills</h3>
            <div
              className={`CMGuide-skills-${strategy.name}-skills CMGuide-skills-rec-list`}
            >
              {strategy.recommended.map((skill) => (
                <DisplaySkill skill={skill} data={skillsData} />
              ))}
            </div>
            <div className={`CM-skills-${strategy.name}-unique-comment`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideSkills;
