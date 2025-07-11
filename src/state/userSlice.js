import { createSlice } from "@reduxjs/toolkit";
import {
  groundProf,
  distanceProf,
  groundMod,
  moodCoefficients,
  strategyCoefficients,
  surfaceProf,
  strategyProf,
} from "../components/home/data/coefficients";

let initialState = {
  uma: {
    umaStrategy: "runner",
    umaMotivation: 1.0,
  },
  track: {
    raceTrackId: 10001,
    name: "芝1200m",
    distance: 1200,
    distanceType: 1,
    surface: 1,
    turn: 1,
    courseSetStatus: [],
    laneMax: 13500,
    finishTimeMin: 67.5,
    finishTimeMax: 71,
    corners: [
      { start: 400, length: 275 },
      { start: 675, length: 259 },
    ],
    straights: [
      { start: 0, end: 400 },
      { start: 934, end: 1200 },
    ],
    slopes: [],
  },
  proficiency: {
    profDistance: 1.0,
    profSurface: 1.0,
    profStrategy: 1.0,
  },
  groundType: "良",
};

const authSlice = createSlice({
  name: "uma",
  initialState,
  reducers: {
    setStrategy: (state, action) => {
      state.uma.umaStrategy = action.payload.strategy;
    },
    setMotivation: (state, action) => {
      let mood = action.payload.mood;
      let findMood = moodCoefficients.find((x) => x.name === mood);
      state.uma.umaMotivation = findMood.moodCI;
    },
    setTrack: (state, action) => {
      state.track = action.payload.track;
    },
    setDistance: (state, action) => {
      state.distance = action.payload.distance;
    },
    setGround: (state, action) => {
      state.groundType = action.payload.ground;
    },
    setProfSurface: (state, action) => {
      let proficiency = action.payload.surface;
      state.proficiency.profSurface = surfaceProf[proficiency];
    },
    setProfDistance: (state, action) => {
      let proficiency = action.payload.distance;
      state.proficiency.profDistance = distanceProf[proficiency];
    },
    setProfStrategy: (state, action) => {
      let proficiency = action.payload.strategy;
      state.proficiency.profStrategy = strategyProf[proficiency];
    },
  },
});

export const {
  setTrack,
  setStrategy,
  setDistance,
  setGround,
  setMotivation,
  setProfSurface,
  setProfDistance,
  setProfStrategy,
} = authSlice.actions;

export default authSlice.reducer;
