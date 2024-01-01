import "./skillSearcher.scss";

const SkillSearcher = ({ skills, image, setSelectedSkill, setSearchShow }) => {
  let { skill_name, skill_name_english, icon_id } = skills;

  const rarity = icon_id.toString().slice(4);

  skill_name_english = textCleaner(skill_name_english);

  const onSkillOnClick = () => {
    setSelectedSkill(skills);
    setSearchShow(false);
  };

  return (
    <div
      className={`skill-searcher-box-container skill-searcher-container-rarity-${rarity}`}
      onClick={() => onSkillOnClick()}
    >
      <div className="skill-searcher-icon">
        <img src={image} alt="skill" />
      </div>
      <div className="skill-searcher-name-container">
        <div className="skill-searcher-JPName">{skill_name}</div>
        <div className="skill-searcher-ENName">
          {skill_name_english ? skill_name_english : "No Translation"}
        </div>
      </div>
    </div>
  );
};

const textCleaner = (text) => {
  if (!text) return;

  let output = text.replace(/<size=18>|<b>|<\/b>|\\n|\\N|<\/size>/gi, "");

  return output;
};

export default SkillSearcher;
// <img
//   src={`http://gametora.com/images/umamusume/skill_icons/utx_ico_skill_${icon_id}.png`}
//   alt="skill"
// />

//10011 -> Green speed White(?)
//10012 -> Green speed Gold
//10016 -> Green speed Evo
//10014 -> Green speed purple
