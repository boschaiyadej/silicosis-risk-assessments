import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  silicaDust: 0,
  workingHours: 0,
  underlyingDiseases: 0,
  residenceSeparation: 0,
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
    calculateRiskLevel(state) {
      const {
        silicaDust,
        workingHours,
        underlyingDiseases,
        residenceSeparation,
      } = state;

      const RiskScore =
        silicaDust * 326.599 +
        workingHours * 0.733 -
        (underlyingDiseases === 2 ? 2.947 : 0) +
        (residenceSeparation === 2 ? 1.414 : 0);

      const validRisk = Number.isNaN(RiskScore)
        ? 0
        : Math.max(0, Math.min(5, (RiskScore / 25) * 5));

      state.riskLevel = parseFloat(validRisk.toFixed(1));
    },
    resetRiskLevel(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setRiskLevel, calculateRiskLevel, resetRiskLevel } =
  riskSlice.actions;

export default riskSlice.reducer;
