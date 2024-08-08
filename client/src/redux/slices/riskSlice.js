import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: 0,
  silicaDust: 0,
  workingHours: 0,
  underlyingDiseases: 0,
  residenceSeparation: 0,
  riskScore: 0,
  riskLevel: null,
};

const riskSlice = createSlice({
  name: "risk",
  initialState,
  reducers: {
    setRiskLevel(state, action) {
      const { name, value } = action.payload;
      state[name] = parseFloat(value) || 0;
    },
    setRiskScore(state, action) {
      state.riskScore = parseFloat(action.payload) || 0;
    },
    calculateRiskLevel(state) {
      const {
        silicaDust,
        workingHours,
        underlyingDiseases,
        residenceSeparation,
      } = state;

      const riskScore =
        silicaDust * 326.599 +
        workingHours * 0.733 -
        (underlyingDiseases === 2 ? 2.947 : 0) +
        (residenceSeparation === 2 ? 1.414 : 0);

      const validRisk = Number.isNaN(riskScore)
        ? 0
        : Math.max(0, Math.min(5, (riskScore / 25) * 5));

      state.riskScore = parseFloat(riskScore.toFixed(2));
      state.riskLevel = parseFloat(validRisk.toFixed(1));
    },
    resetRiskLevel(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setRiskScore,
  setRiskLevel,
  calculateRiskLevel,
  resetRiskLevel,
} = riskSlice.actions;

export default riskSlice.reducer;
