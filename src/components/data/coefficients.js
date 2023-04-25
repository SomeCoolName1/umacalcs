const strategyCoefficients = [
  {
    strategy: "great escape",
    speedCI: {
      openingLeg: 1.063,
      middleLeg: 0.962,
      finalLeg: 0.95,
    },
    accelCI: {
      openingLeg: 1.17,
      middleLeg: 0.94,
      finalLeg: 0.956,
    },
    staminaCI: 0.86,
    conserveCI: {
      short: 1.0,
      mile: 1.0,
      mid: 1.0,
      long: 1.0,
    },
  },
  {
    strategy: "runner",
    speedCI: {
      openingLeg: 1,
      middleLeg: 0.98,
      finalLeg: 0.962,
    },
    accelCI: {
      openingLeg: 1,
      middleLeg: 1,
      finalLeg: 0.996,
    },
    staminaCI: 0.95,
    conserveCI: {
      short: 1.0,
      mile: 1.0,
      mid: 1.0,
      long: 1.0,
    },
  },
  {
    strategy: "leader",
    speedCI: {
      openingLeg: 0.978,
      middleLeg: 0.991,
      finalLeg: 0.975,
    },
    accelCI: {
      openingLeg: 0.985,
      middleLeg: 1.0,
      finalLeg: 0.996,
    },
    staminaCI: 0.89,
    conserveCI: {
      short: 0.7,
      mile: 0.8,
      mid: 0.9,
      long: 0.9,
    },
  },
  {
    strategy: "betweener",
    speedCI: {
      openingLeg: 0.938,
      middleLeg: 0.998,
      finalLeg: 0.994,
    },
    accelCI: {
      openingLeg: 0.975,
      middleLeg: 1.0,
      finalLeg: 1.0,
    },
    staminaCI: 1,
    conserveCI: {
      short: 0.75,
      mile: 0.7,
      mid: 0.875,
      long: 1.0,
    },
  },
  {
    strategy: "chaser",
    speedCI: {
      openingLeg: 0.931,
      middleLeg: 1.0,
      finalLeg: 1.0,
    },
    accelCI: {
      openingLeg: 0.945,
      middleLeg: 1.0,
      finalLeg: 0.997,
    },
    staminaCI: 0.995,
    conserveCI: {
      short: 0.7,
      mile: 0.75,
      mid: 0.86,
      long: 0.9,
    },
  },
];

const groundMod = [
  {
    name: "良",
    groundSpeedMod: {
      turf: 0,
      dirt: 0,
    },
    groundPowerMod: {
      turf: 0,
      dirt: -100,
    },
    groundHPMod: {
      turf: 1.0,
      dirt: 1.0,
    },
  },
  {
    name: "稍重",
    groundSpeedMod: {
      turf: 0,
      dirt: 0,
    },
    groundPowerMod: {
      turf: -50,
      dirt: -50,
    },
    groundHPMod: {
      turf: 1.0,
      dirt: 1.0,
    },
  },
  {
    name: "重",
    groundSpeedMod: {
      turf: 0,
      dirt: 0,
    },
    groundPowerMod: {
      turf: -50,
      dirt: -50,
    },
    groundHPMod: {
      turf: 1.02,
      dirt: 1.01,
    },
  },
  {
    name: "不良",
    groundSpeedMod: {
      turf: -50,
      dirt: -50,
    },
    groundPowerMod: {
      turf: -50,
      dirt: -100,
    },
    groundHPMod: {
      turf: 1.02,
      dirt: 1.02,
    },
  },
];

const moodCoefficients = [
  { name: "絶好調", moodCI: 1.04 },
  { name: "好調", moodCI: 1.02 },
  { name: "普通", moodCI: 1 },
  { name: "不調", moodCI: 0.98 },
  { name: "絶不調", moodCI: 0.96 },
];

const distanceProf = {
  S: 1.05,
  A: 1.0,
  B: 0.9,
  C: 0.8,
  D: 0.6,
  E: 0.4,
  F: 0.2,
  G: 0.1,
};

const surfaceProf = {
  S: 1.05,
  A: 1.0,
  B: 0.9,
  C: 0.8,
  D: 0.7,
  E: 0.5,
  F: 0.3,
  G: 0.1,
};

const strategyProf = {
  S: 1.1,
  A: 1.0,
  B: 0.85,
  C: 0.75,
  D: 0.6,
  E: 0.4,
  F: 0.2,
  G: 0.1,
};

const phaseCoefficient = [
  {
    openingLeg: {
      In: 1.0,
      Out: 100.0,
    },
    middleLeg: {
      In: 1.0,
      Out: 1.0,
    },
    finalLeg: {
      In: 1.0,
      Out: 1.15,
    },
  },
];

module.exports = {
  surfaceProf: surfaceProf,
  distanceProf: distanceProf,
  strategyProf: strategyProf,
  strategyCoefficients: strategyCoefficients,
  moodCoefficients: moodCoefficients,
  groundMod: groundMod,
};
