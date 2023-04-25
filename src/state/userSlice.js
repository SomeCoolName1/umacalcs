import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uma: {
    umaStrategy: "great escape",
    umaMotivation: "普通",
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
    profDistance: null,
    profSurface: null,
    profStrategy: null,
  },
  groundType: "良",
};

export const authSlice = createSlice({
  name: "uma",
  initialState,
  reducers: {
    setStrategy: (state, action) => {
      state.uma.umaStrategy = action.payload.strategy;
    },
    setMotivation: (state, action) => {
      state.uma.umaMotivation = action.payload.motivation;
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
    setProfDistance: (state, action) => {
      state.proficiency.profDistance = action.payload.distance;
    },
    setProfSurface: (state, action) => {
      state.proficiency.profSurface = action.payload.distance;
    },
    setProfStrategy: (state, action) => {
      state.proficiency.profStrategy = action.payload.distance;
    },
  },
});

export const { setTrack, setStrategy, setDistance, setGround, setMotivation } =
  authSlice.actions;

export default authSlice.reducer;
