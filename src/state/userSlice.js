import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uma: {
    umaStrategy: "great escape",
    umaMotivation: "普通",
  },
  track: null,
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