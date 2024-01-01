import greenSpeed from "../../../assets/skillimages/icon_skill_10011.png";
import greenStamina from "../../../assets/skillimages/icon_skill_10021.png";
import greenPower from "../../../assets/skillimages/icon_skill_10031.png";
import greenGuts from "../../../assets/skillimages/icon_skill_10041.png";
import greenWiz from "../../../assets/skillimages/icon_skill_10051.png";
import greenStat from "../../../assets/skillimages/icon_skill_10061.png";
import whiteSpeed from "../../../assets/skillimages/icon_skill_20011.png";
import whiteRecovery from "../../../assets/skillimages/icon_skill_20021.png";
import whiteAccel from "../../../assets/skillimages/icon_skill_20041.png";
import whiteLaneMov from "../../../assets/skillimages/icon_skill_20051.png";
import whiteGate from "../../../assets/skillimages/icon_skill_20061.png";
import whiteVision from "../../../assets/skillimages/icon_skill_20091.png";
import speedDebuff from "../../../assets/skillimages/icon_skill_30011.png";
import accelDebuff from "../../../assets/skillimages/icon_skill_30021.png";
import panicDebuff from "../../../assets/skillimages/icon_skill_30041.png";
import staminaDebuff from "../../../assets/skillimages/icon_skill_30051.png";
import visionDebuff from "../../../assets/skillimages/icon_skill_30071.png";

const generics = [
  {
    name: "Generic",
    condition: [
      "running_style==1",
      "running_style==2",
      "running_style==3",
      "running_style==4",
      "distance_type==1",
      "distance_type==2",
      "distance_type==3",
      "distance_type==4",
      "ground_type==1",
      "ground_type==2",
    ],
    img: null,
  },
];

const strategyType = [
  {
    name: "Runner",
    condition: ["running_style==1"],
    img: null,
  },
  {
    name: "Leader",
    condition: ["running_style==2"],
    img: null,
  },
  {
    name: "Betweener",
    condition: ["running_style==3"],
    img: null,
  },
  {
    name: "Chaser",
    condition: ["running_style==4"],
    img: null,
  },
];
const distanceType = [
  {
    name: "Short",
    condition: ["distance_type==1"],
    img: null,
  },
  {
    name: "Mile",
    condition: ["distance_type==2"],
    img: null,
  },
  {
    name: "Medium",
    condition: ["distance_type==3"],
    img: null,
  },
  {
    name: "Long",
    condition: ["distance_type==4"],
    img: null,
  },
];
const groundType = [
  {
    name: "Turf",
    condition: ["ground_type==1"],
    img: null,
  },
  {
    name: "Dirt",
    condition: ["ground_type==2"],
    img: null,
  },
];
const skillType = [
  {
    name: "White Skill",
    condition: [1],
    img: null,
  },
  {
    name: "Gold Skill",
    condition: [2],
    img: null,
  },
  {
    name: "Evolved Skill",
    condition: [6],
    img: null,
  },
  {
    name: "Unique Skill",
    condition: [3],
    img: null,
  },
  {
    name: "Inherited Skill",
    condition: [9],
    img: null,
  },
];
//Inherited skill Skill_Id starts with 9, end with 1
const allIcons = [
  {
    name: "greenSpeed",
    img: greenSpeed,
    condition: [10011, 10012, 10014, 10016],
  },
  {
    name: "greenStamina",
    img: greenStamina,
    condition: [10021, 10022, 10024, 10026, 20181],
  },
  {
    name: "greenPower",
    img: greenPower,
    condition: [10031, 10032, 10034, 10036],
  },
  {
    name: "greenGuts",
    img: greenGuts,
    condition: [10041, 10044],
  },
  {
    name: "greenWiz",
    img: greenWiz,
    condition: [10051, 10054],
  },
  {
    name: "greenStat",
    img: greenStat,
    condition: [10061, 10062],
  },
  {
    name: "whiteSpeed",
    img: whiteSpeed,
    condition: [
      20011, 20012, 20013, 20014, 20016, 20101, 20102, 20141, 20142, 20151,
      20152, 20161, 20162, 20191, 20192, 20211, 20212,
    ],
  },
  {
    name: "whiteRecovery",
    img: whiteRecovery,
    condition: [20021, 20022, 20023, 20024, 20026, 20111, 20112],
  },
  {
    name: "whiteAccel",
    img: whiteAccel,
    condition: [
      20041, 20042, 20043, 20044, 20046, 20121, 20122, 20171, 20201, 20202,
    ],
  },
  {
    name: "whiteLaneMov",
    img: whiteLaneMov,
    condition: [20051, 20052, 20056, 20131, 20132],
  },
  {
    name: "whiteGate",
    img: whiteGate,
    condition: [20061, 20062, 20064],
  },
  {
    name: "whiteVision",
    img: whiteVision,
    condition: [20091, 20092, 20096],
  },
  {
    name: "speedDebuff",
    img: speedDebuff,
    condition: [30011, 30012, 30016],
  },
  {
    name: "accelDebuff",
    img: accelDebuff,
    condition: [30021, 30022, 30026],
  },
  { name: "panicDebuff", img: panicDebuff, condition: [30041] },
  {
    name: "staminaDebuff",
    img: staminaDebuff,
    condition: [30051, 30052, 30056],
  },
  {
    name: "visionDebuff",
    img: visionDebuff,
    condition: [30071, 30072, 30076],
  },
];

export const allFilters = [
  { name: "skill", group: allIcons, filterStyle: "skill" },
  // { name: "generic", group: generics, filterStyle: "condition" },
  { name: "rarity", group: skillType, filterStyle: "rarity" },
  { name: "strategy", group: strategyType, filterStyle: "condition" },
  { name: "distance", group: distanceType, filterStyle: "condition" },
  { name: "ground", group: groundType, filterStyle: "condition" },
];
