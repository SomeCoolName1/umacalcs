import speedWhite from "../../assets/skillimages/speed-passive-white.png";
import speedGold from "../../assets/skillimages/speed-passive-gold.png";
import speedEvolved from "../../assets/skillimages/speed-passive-evolved.png";
import staminaWhite from "../../assets/skillimages/stamina-passive-white.png";
import staminaGold from "../../assets/skillimages/stamina-passive-gold.png";
import staminaEvolved from "../../assets/skillimages/stamina-passive-evolved.png";
import staminaURA from "../../assets/skillimages/stamina-passive-ura.png";
import powerWhite from "../../assets/skillimages/power-passive-white.png";
import powerGold from "../../assets/skillimages/power-passive-gold.png";
import gutsWhite from "../../assets/skillimages/guts-passive-white.png";
import intWhite from "../../assets/skillimages/int-passive-white.png";
import "./passiveskills.scss";
import { useState } from "react";

const whitePassives = [
  { name: ["スペード"], img: speedWhite, value: 40, number: 0 },
  { name: ["スペード"], img: speedWhite, value: 60, number: 0 },
  { name: ["スタミナ"], img: staminaWhite, value: 40, number: 0 },
  { name: ["スタミナ"], img: staminaWhite, value: 60, number: 0 },
  { name: ["パワー"], img: powerWhite, value: 40, number: 0 },
  { name: ["パワー"], img: powerWhite, value: 60, number: 0 },
  { name: ["根性"], img: gutsWhite, value: 40, number: 0 },
  { name: ["賢さ"], img: intWhite, value: 40, number: 0 },
];

const goldPassives = [
  { name: ["スペード", ", ", "パワー"], img: speedGold, value: 60, number: 0 },
  {
    name: ["スペード", ", ", "パワー", ", ", "根性"],
    img: speedGold,
    value: 80,
    number: 0,
  },
  {
    name: ["スペード", ", ", "スタミナ", ", ", "賢さ"],
    img: staminaGold,
    value: 60,
    number: 0,
  },
];

const evolvedPassives = [
  {
    name: ["スペード", ", ", "パワー"],
    img: speedEvolved,
    value: 80,
    number: 0,
  },
  {
    name: ["スペード", ", ", "パワー", ", ", "根性"],
    img: speedEvolved,
    value: 100,
    number: 0,
  },
  {
    name: ["スペード", ", ", "スタミナ", ", ", "賢さ"],
    img: staminaEvolved,
    value: 80,
    number: 0,
  },
];

const passivesList = [
  { name: "white-passive", list: whitePassives },
  { name: "gold-passive", list: goldPassives },
  { name: "evolved-passive", list: evolvedPassives },
];

const PassiveSkills = ({ setStats, passiveStats }) => {
  const updateValues = (list, passive, op) => {
    passivesList.map((key) => {
      if (key.name === list) {
        let findPassive = key.list.find((x) => x === passive);
        if (op === "add") {
          findPassive.number += 1;
        } else {
          findPassive.number -= 1;
        }
        return { ...key };
      }
    });

    passive.name.map((stat) => {
      switch (stat) {
        case "スペード":
          setStats((prev) => ({
            ...prev,
            speed:
              op === "add"
                ? (prev.speed += passive.value)
                : Math.max((prev.speed -= passive.value), 0),
          }));
          break;
        case "スタミナ":
          setStats((prev) => ({
            ...prev,
            stamina:
              op === "add"
                ? (prev.stamina += passive.value)
                : Math.max((prev.stamina -= passive.value), 0),
          }));
          break;
        case "パワー":
          setStats((prev) => ({
            ...prev,
            power:
              op === "add"
                ? (prev.power += passive.value)
                : Math.max((prev.power -= passive.value), 0),
          }));
          break;
        case "根性":
          setStats((prev) => ({
            ...prev,
            guts:
              op === "add"
                ? (prev.guts += passive.value)
                : Math.max((prev.guts -= passive.value), 0),
          }));
          break;
        case "賢さ":
          setStats((prev) => ({
            ...prev,
            int:
              op === "add"
                ? (prev.int += passive.value)
                : Math.max((prev.int -= passive.value), 0),
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

    passivesList.map((key) => {
      key.list.map((passive) => {
        return (passive.number = 0);
      });
    });
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
      {passivesList.map((key) => {
        return (
          <>
            <h3>{key.name}</h3>
            <div className={`${key.name}-container passive-container`}>
              {key.list.map((passive) => {
                return (
                  <div className={`${key.name} passive`}>
                    <div className="passive-details stat-details">
                      <button className="passive-skills-list">i</button>
                      <img src={passive.img} alt="passive" />
                      <span>
                        {passive.name} {passive.value}
                      </span>
                    </div>
                    <div className="number-of-passives">
                      <button
                        className={`number-button ${
                          passive.number <= 0 ? "disabled" : ""
                        }`}
                        onClick={() => updateValues(key.name, passive, "minus")}
                      >
                        −
                      </button>
                      <p>{passive.number}</p>

                      <button
                        className="number-button"
                        value={`${passive.value} ${passive.name}`}
                        onClick={() => updateValues(key.name, passive, "add")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default PassiveSkills;
