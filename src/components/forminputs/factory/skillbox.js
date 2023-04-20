import { useRef, useState } from "react";
import "./skillbox.scss";

const SkillBox = ({ skill, recovered, updateButton, skillType }) => {
  const [show, setShow] = useState(false);

  const changeShow = () => {
    setShow((prevCheck) => !prevCheck);
  };

  const dropdownMenu = useRef(null);

  const closeDropdowns = (e) => {
    if (
      dropdownMenu.current &&
      show &&
      !dropdownMenu.current.contains(e.target)
    ) {
      setShow(false);
    }
  };
  document.addEventListener("mousedown", closeDropdowns);

  return (
    <div className={`skill-container skill-type-${skillType}`}>
      <div className="skill-details">
        <div className="skill-references">
          <div
            ref={dropdownMenu}
            className={`skills-list-container ${
              show === true ? "show" : "hidden"
            }`}
          >
            {skill.skillsList.map((x) => (
              <p>{x}</p>
            ))}
          </div>
          <button
            className="skills-list"
            ref={dropdownMenu}
            onClick={() => changeShow()}
          >
            i
          </button>
        </div>
        <img src={skill.img} alt="skill-icon" />
        <span>
          {skill.name}
          {recovered ? ` : ${recovered(skill.value)} Stamina` : ""}
        </span>
      </div>
      <div className="number-of-skills">
        <button
          className={`number-button ${skill.number <= 0 ? "disabled" : ""}`}
          onClick={() => updateButton(skill, "minus")}
        >
          {"−"}
        </button>
        <p>{skill.number}</p>
        <button
          className="number-button"
          onClick={() => updateButton(skill, "add")}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SkillBox;
