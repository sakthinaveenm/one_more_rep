import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Workout {
  name: string;
  sets: number;
  reps: number;
}

interface Day {
  id: number;
  day: string;
  workouts: Workout[];
}

interface PlanState {
  plan: Day[];
}

const initialState: PlanState = {
  plan: [],
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan(state, action: PayloadAction<Day[]>) {
      state.plan = action.payload;
    },
    clearPlan(state) {
      state.plan = [];
    },
  },
});

export const { setPlan, clearPlan } = planSlice.actions;
export default planSlice.reducer;
