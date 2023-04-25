import { useRef, useState } from "react";
import "./skillbox.scss";

const Passiveskillbox = ({ skill, recovered, updateButton, skillType }) => {
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
        <div className="skill-icon-container">
          <img src={skill.img} alt="skill-icon" />
          <span>
            {skill.name}
            {recovered ? ` : ${recovered(skill.value)} Stamina` : ""}
          </span>
        </div>
      </div>
      <div className="passive-counter-container">
        {skill.skillValue.map((key) => {
          return (
            <div className="passive-counter">
              <button
                className={`number-button ${key.amount <= 0 ? "disabled" : ""}`}
                onClick={() => updateButton(skill, "minus", key)}
              >
                -{key.value}
              </button>
              <p>{key.amount}</p>
              <button
                className="number-button"
                onClick={() => updateButton(skill, "add", key)}
              >
                +{key.value}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Passiveskillbox;
