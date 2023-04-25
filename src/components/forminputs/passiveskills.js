import passiveSkillsList from "../data/skillspassive";
import "./passiveskills.scss";
import SkillBox from "../factory/skillbox";
import { useState } from "react";

const PassiveSkills = ({ setStats, passiveStats }) => {
  const [umaPassives, setUmaPassives] = useState(passiveSkillsList);

  const updateValues = (skill, operator, key) => {
    let skillsList = { ...umaPassives };
    const mergeList = {
      ...skillsList["White Passive"],
      ...skillsList["Gold/Evolved Passive"],
    };
    let findSkill = Object.values(mergeList).find((x) => x === skill);
    let findValue = findSkill.skillValue.find((x) => x === key);
    let value = key.value;

    operator === "add" ? (findValue.amount += 1) : (findValue.amount -= 1);
    setUmaPassives(skillsList);

    skill.stat.map((x) => {
      switch (x) {
        case "スペード":
          setStats((prev) => ({
            ...prev,
            speed:
              operator === "add"
                ? (prev.speed += value)
                : Math.max((prev.speed -= value), 0),
          }));
          break;
        case "スタミナ":
          setStats((prev) => ({
            ...prev,
            stamina:
              operator === "add"
                ? (prev.stamina += value)
                : Math.max((prev.stamina -= value), 0),
          }));
          break;
        case "パワー":
          setStats((prev) => ({
            ...prev,
            power:
              operator === "add"
                ? (prev.power += value)
                : Math.max((prev.power -= value), 0),
          }));
          break;
        case "根性":
          setStats((prev) => ({
            ...prev,
            guts:
              operator === "add"
                ? (prev.guts += value)
                : Math.max((prev.guts -= value), 0),
          }));
          break;
        case "賢さ":
          setStats((prev) => ({
            ...prev,
            int:
              operator === "add"
                ? (prev.int += value)
                : Math.max((prev.int -= value), 0),
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
      ...skillsList["Gold/Evolved Passive"],
    };

    Object.values(mergeList).map((key) => {
      let value = key.skillValue;
      for (let i = 0; i < value.length; i++) {
        value[i].amount = 0;
      }
    });
  };

  return (
    <div className="passive-skills-container">
      <div className="passives-title-container">
        <h2>Passive Skills</h2>
        <h2 className="passive-sum-total">
          {Object.entries(passiveStats).map((key, index) => {
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
            <h3 className="passive-rarity-header">{key[0]}</h3>
            <div className="skill-box-container">
              {Object.values(key[1]).map((x, index) => (
                <SkillBox
                  key={index}
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
