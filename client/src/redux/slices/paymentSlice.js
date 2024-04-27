import { createSlice } from "@reduxjs/toolkit";

const paymentInitialState = {
  workId: "",
  freelancerId: "",
  amount: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: paymentInitialState,
  reducers: {
    addPayment: (state, action) => {
      const { workId, freelancerId, amount } = action.payload;
      state.workId = workId;
      state.freelancerId = freelancerId;
      state.amount = amount;
    },
  },
});
export const { addPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
