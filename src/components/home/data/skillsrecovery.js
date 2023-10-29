import evolvedRecovery from "../../../assets/skillimages/evolved-recovery.png";
import goldRecovery from "../../../assets/skillimages/gold-recovery.png";
import whiteRecovery from "../../../assets/skillimages/white-recovery.png";
import whiteSpeed from "../../../assets/skillimages/white-speed.png";
import uniqueSpeed from "../../../assets/skillimages/unique-speed.png";
import whiteStamDebuff from "../../../assets/skillimages/white-stamina-debuff.png";
import goldStamDebuff from "../../../assets/skillimages/gold-stamina-debuff.png";

export const RecoverySkills = {
  reco095: {
    name: "9.50%",
    img: evolvedRecovery,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: 0.095,
  },
  reco075: {
    name: "7.50%",
    img: evolvedRecovery,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: 0.075,
  },
  reco055: {
    name: "5.50%",
    img: goldRecovery,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: 0.055,
  },
  reco035: {
    name: "3.50%",
    img: uniqueSpeed,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: 0.035,
  },
  reco015: {
    name: "1.50%",
    img: whiteRecovery,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: 0.015,
  },
  reco0005: {
    name: "0.5%",
    img: whiteSpeed,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: 0.0035,
  },
  reco0035: {
    name: "0.35%",
    img: uniqueSpeed,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: 0.005,
  },
  drain30: {
    name: "-3.00%",
    img: goldStamDebuff,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: -0.03,
  },
  drain20: {
    name: "-2.00%",
    img: whiteSpeed,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: -0.02,
  },
  drain10: {
    name: "-1.00%",
    img: whiteStamDebuff,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: -0.01,
  },
  dragin05: {
    name: "-0.50%",
    img: uniqueSpeed,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: -0.005,
  },
  drain025: {
    name: "-0.25%",
    img: uniqueSpeed,
    skillsList: [""],
    skillValue: [{ value: 1, amount: 0 }],
    value: -0.0025,
  },
};

export default RecoverySkills;
