export const abilityMap = {
  1: function (value) {
    let desc = equality(value);

    return `${desc} Speed by ${value / 10000}`;
  },
  2: function (value) {
    let desc = equality(value);

    return `${desc} Stamina by ${value / 10000}`;
  },
  3: function (value) {
    let desc = equality(value);

    return `${desc} Power by ${value / 10000}`;
  },
  4: function (value) {
    let desc = equality(value);

    return `${desc} Guts by ${value / 10000}`;
  },
  5: function (value) {
    let desc = equality(value);

    return `${desc} Wisdom by ${value / 10000}`;
  },
  6: function (value) {
    return "I don't fken know";
  },
  7: function (value) {
    return "I don't fken know";
  },
  8: function (value) {
    let desc = equality(value);

    return `${desc} Field of View by ${value / 10000}`;
  },
  9: function (value) {
    let desc = equality(value);
    return `${desc} HP by ${value / 100}%`;
  },
  10: function (value) {
    let desc = equality(value);
    return `${desc} Reaction Time by ${value / 10000}`;
  },
  11: function (value) {
    return "I dont fken know";
  },
  12: function (value) {
    return "I dont fken know";
  },
  13: function (value) {
    let desc = equality(value);
    return `${desc} Kakari Time by ${value / 10000}`;
  },
  14: function (value) {
    return "I dont fken know";
  },
  15: function (value) {
    return "I dont fken know";
  },
  16: function (value) {
    return "I dont fken know";
  },
  17: function (value) {
    return "I dont fken know";
  },
  18: function (value) {
    return "I dont fken know";
  },
  19: function (value) {
    return "I dont fken know";
  },
  20: function (value) {
    return "I dont fken know";
  },
  21: function (value) {
    let desc = equality(value);
    return `${desc} Current Speed by ${value / 10000} m/s`;
  },
  22: function (value) {
    return "I dont fken know";
  },
  23: function (value) {
    return "I dont fken know";
  },
  24: function (value) {
    return "I dont fken know";
  },
  25: function (value) {
    return "I dont fken know";
  },
  26: function (value) {
    return "I dont fken know";
  },
  27: function (value) {
    let desc = equality(value);
    return `${desc} Target Speed by ${value / 10000} m/s`;
  },
  28: function (value) {
    let desc = equality(value);
    return `${desc} Lane Movement Speed by ${value / 10000} m/s`;
  },
  29: function (value) {
    return "I dont fken know";
  },
  30: function (value) {
    return "I dont fken know";
  },
  31: function (value) {
    let desc = equality(value);
    return `${desc} Acceleration by ${value / 10000} m/s²`;
  },
  32: function (value) {
    return "I dont fken know";
  },
  33: function (value) {
    return "I dont fken know";
  },
  34: function (value) {
    return "I dont fken know";
  },

  35: function (value) {
    return "I dont fken know";
  },

  36: function (value) {
    return "I dont fken know";
  },

  37: function (value) {
    return "I dont fken know";
  },

  38: function (value) {
    return "I dont fken know";
  },

  39: function (value) {
    return "I dont fken know";
  },
};

const equality = (value) => {
  return value > 0 ? "Increase" : "Decrease";
};

//None
//1 - Speed
//2 - Stamina
//3 - Power
//4 - Guts
//5 - Wiz
//6 - Hp
//7 - HPDecRate
//8 - Visible Distance
//9 - HpRate - Recovery
//10 - StartDash
//11 - ForceOverTakeIn
//12 - ForceOverTakeout
//13 - TemptationEndTime
//14
//15
//16
//17
//18
//19
//20
//21 - Current Speed
//22
//23
//24
//25
//26
//27 - target speed
//28 - Lane Move Speed
//29 - Temptation Per
//30 - PushPer
//31 - acceleration
//32
//33
//34
//35 - TargetLane
//36
//37
//38
//39
//40
//41
//42
