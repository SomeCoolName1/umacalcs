import "./skillSearcher.scss";

const SkillSearcher = ({ skills, image, setSelectedSkill, setSearchShow }) => {
  let { skillName, iconId } = skills;

  const rarity = iconId.toString().slice(4);

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
        <div className="skill-searcher-JPName">{skillName}</div>
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
