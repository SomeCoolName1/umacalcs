import evolvedRecovery from "../../assets/skillimages/evolved-recovery.png";
import goldRecovery from "../../assets/skillimages/gold-recovery.png";
import whiteRecovery from "../../assets/skillimages/white-recovery.png";
import whiteSpeed from "../../assets/skillimages/white-speed.png";
import uniqueSpeed from "../../assets/skillimages/unique-speed.png";
import whiteStamDebuff from "../../assets/skillimages/white-stamina-debuff.png";
import goldStamDebuff from "../../assets/skillimages/gold-stamina-debuff.png";

const recoverySkills = {
  reco095: {
    name: "9.50%",
    img: evolvedRecovery,
    skillsList: [""],
    value: 0.095,
    number: 0,
  },
  reco075: {
    name: "7.50%",
    img: evolvedRecovery,
    skillsList: [""],
    value: 0.075,
    number: 0,
  },
  reco055: {
    name: "5.50%",
    img: goldRecovery,
    skillsList: [""],
    value: 0.055,
    number: 0,
  },
  reco035: {
    name: "3.50%",
    img: uniqueSpeed,
    skillsList: [""],
    value: 0.035,
    number: 0,
  },
  reco015: {
    name: "1.50%",
    img: whiteRecovery,
    skillsList: [""],
    value: 0.015,
    number: 0,
  },
  reco0005: {
    name: "0.5%",
    img: whiteSpeed,
    skillsList: [""],
    value: 0.0035,
    number: 0,
  },
  reco0035: {
    name: "0.35%",
    img: uniqueSpeed,
    skillsList: [""],
    value: 0.005,
    number: 0,
  },
  drain30: {
    name: "-3.00%",
    img: goldStamDebuff,
    skillsList: [""],
    value: -0.03,
    number: 0,
  },
  drain20: {
    name: "-2.00%",
    img: whiteSpeed,
    skillsList: [""],
    value: -0.02,
    number: 0,
  },
  drain10: {
    name: "-1.00%",
    img: whiteStamDebuff,
    skillsList: [""],
    value: -0.01,
    number: 0,
  },
  dragin05: {
    name: "-0.50%",
    img: uniqueSpeed,
    skillsList: [""],
    value: -0.005,
    number: 0,
  },
  drain025: {
    name: "-0.25%",
    img: uniqueSpeed,
    skillsList: [""],
    value: -0.0025,
    number: 0,
  },
};

export default recoverySkills;
