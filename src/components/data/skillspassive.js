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

export const PassiveSkillsList = {
  "White Passive": {
    speedwhite: {
      name: "スペード",
      stat: ["スペード"],
      skillValue: [
        { value: 40, amount: 0 },
        { value: 60, amount: 0 },
      ],
      skillsList: [
        "右回り",
        "左回り",
        "春ウマ娘",
        "夏ウマ娘",
        "秋ウマ娘",
        "冬ウマ娘",
        "外枠得意",
        "おひとり様",
        "伏兵○",
        "シンパシー",
        "一匹狼",
        "交流重賞",
        "踏み込み上手",
        "泥遊び",
      ],
      img: speedWhite,
    },

    staminawhite: {
      name: "スタミナ",
      stat: ["スタミナ"],
      skillValue: [
        { value: 40, amount: 0 },
        { value: 60, amount: 0 },
      ],
      skillsList: ["-レース場○", "根幹距離○", "非根幹距離○"],
      img: staminaWhite,
    },

    powerwhite: {
      name: "パワー",
      stat: ["パワー"],
      skillValue: [
        { value: 40, amount: 0 },
        { value: 60, amount: 0 },
      ],
      skillsList: ["良バ場○", "道悪○", "対抗意識○"],
      img: powerWhite,
    },
    gutswhite: {
      name: "根性",
      stat: ["根性"],
      skillValue: [
        { value: 40, amount: 0 },
        { value: 60, amount: 0 },
      ],
      skillsList: [
        "晴れの日○",
        "曇りの日○",
        "雨の日○",
        "雪の日○",
        "徹底マーク○",
      ],
      img: gutsWhite,
    },
    intwhite: {
      name: "賢さ",
      stat: ["賢さ"],
      skillValue: [
        { value: 40, amount: 0 },
        { value: 60, amount: 0 },
      ],
      skillsList: [
        "内枠得意○",
        "逃げのコツ○",
        "先行のコツ○",
        "差しのコツ○",
        "追込のコツ○",
        "ナイター○",
        "小回り○",
      ],
      img: intWhite,
    },
    selfControl: {
      name: "自制心",
      stat: ["賢さ"],
      skillValue: [{ value: 60, amount: 0 }],
      skillsList: ["自制心"],
      img: intWhite,
    },
  },
  "Gold/Evolved Passive": {
    speedpower: {
      name: "スペード, パワー",
      stat: ["スペード", "パワー"],
      skillValue: [
        { value: 60, amount: 0 },
        { value: 80, amount: 0 },
      ],
      skillsList: [
        "初嵐",
        "春一番",
        "右回りの鬼",
        "泥んこマイスター",
        "良バ場の鬼",
      ],
      img: speedGold,
    },
    speedpowerguts: {
      name: "スペード, パワー, 根性",
      stat: ["スペード", "パワー", "根性"],
      skillValue: [
        { value: 80, amount: 0 },
        { value: 100, amount: 0 },
      ],
      skillsList: ["勝負師"],
      img: speedGold,
    },
    speedstamint: {
      name: "スペード, スタミナ, 賢さ",
      stat: ["スペード", "スタミナ", "賢さ"],
      skillValue: [
        { value: 60, amount: 0 },
        { value: 80, amount: 0 },
      ],
      skillsList: ["淀の申し子"],
      img: staminaGold,
    },
  },
  // "Evolved Passive": {
  //   speedpower80: {
  //     name: "スペード, パワー 80",
  //     stat: ["スペード", "パワー"],
  //     value: 80,
  //     skillsList: [
  //       "風霜高潔",
  //       "いたずらマイスター",
  //       "春風吹きて、桜舞う",
  //       "右回りの輪舞曲",
  //       "けふ九重に満開です",
  //     ],
  //     img: speedEvolved,
  //     number: 0,
  //   },
  //   speedpowerguts100: {
  //     name: "スペード, パワー, 根性 100",
  //     stat: ["スペード", "パワー", "根性"],
  //     value: 100,
  //     skillsList: ["鉄火のギャンブラー"],
  //     img: speedEvolved,
  //     number: 0,
  //   },
  //   speedstamint80: {
  //     name: "スペード, スタミナ, 賢さ 80",
  //     stat: ["スペード", "スタミナ", "賢さ"],
  //     value: 80,
  //     skillsList: ["淀の女王"],
  //     img: staminaEvolved,
  //     number: 0,
  //   },
  // },
};

export default PassiveSkillsList;
