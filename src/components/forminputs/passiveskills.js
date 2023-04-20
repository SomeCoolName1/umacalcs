import passiveSkillsList from "../data/skillspassive";
import SkillBox from "./factory/skillbox";
import "./passiveskills.scss";
import { useState } from "react";

const PassiveSkills = ({ setStats, passiveStats }) => {
  const [umaPassives, setUmaPassives] = useState(passiveSkillsList);

  const updateValues = (skill, operator) => {
    let skillsList = { ...umaPassives };

    const mergeList = {
      ...skillsList["White Passive"],
      ...skillsList["Gold Passive"],
      ...skillsList["Evolved Passive"],
    };

    let findSkill = Object.values(mergeList).find((x) => x === skill);

    if (operator === "add") {
      findSkill.number += 1;
    } else findSkill.number -= 1;

    setUmaPassives(skillsList);

    skill.stat.map((x) => {
      switch (x) {
        case "スペード":
          setStats((prev) => ({
            ...prev,
            speed:
              operator === "add"
                ? (prev.speed += skill.value)
                : Math.max((prev.speed -= skill.value), 0),
          }));
          break;
        case "スタミナ":
          setStats((prev) => ({
            ...prev,
            stamina:
              operator === "add"
                ? (prev.stamina += skill.value)
                : Math.max((prev.stamina -= skill.value), 0),
          }));
          break;
        case "パワー":
          setStats((prev) => ({
            ...prev,
            power:
              operator === "add"
                ? (prev.power += skill.value)
                : Math.max((prev.power -= skill.value), 0),
          }));
          break;
        case "根性":
          setStats((prev) => ({
            ...prev,
            guts:
              operator === "add"
                ? (prev.guts += skill.value)
                : Math.max((prev.guts -= skill.value), 0),
          }));
          break;
        case "賢さ":
          setStats((prev) => ({
            ...prev,
            int:
              operator === "add"
                ? (prev.int += skill.value)
                : Math.max((prev.int -= skill.value), 0),
          }));
          break;
        default:
          break;
      }
    });
  };

  const clearStats = () => {
    setStats({
      speed: 0,
      stamina: 0,
      power: 0,
      guts: 0,
      int: 0,
    });

    let skillsList = { ...umaPassives };

    const mergeList = {
      ...skillsList["White Passive"],
      ...skillsList["Gold Passive"],
      ...skillsList["Evolved Passive"],
    };

    Object.values(mergeList).map((key) => (key.number = 0));
  };

  return (
    <div className="passive-skills-container">
      <div className="passives-title-container">
        <h2>Passive Skills</h2>
        <h2 className="passive-sum-total">
          {Object.entries(passiveStats).map((key) => {
            return (
              <span className="passive-sum">
                {key[0]}: {key[1]},{" "}
              </span>
            );
          })}
          <button onClick={clearStats}>Clear</button>
        </h2>
      </div>

      {Object.entries(umaPassives).map((key) => {
        return (
          <>
            <h3>{key[0]}</h3>
            <div className="skill-box-container">
              {Object.values(key[1]).map((x) => (
                <SkillBox
                  skill={x}
                  recovered={null}
                  updateButton={updateValues}
                  skillType={"passive"}
                />
              ))}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default PassiveSkills;
