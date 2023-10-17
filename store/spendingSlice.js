import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSpendingsBy, addNewSpending } from "@/helpers/api-utils";

const initialState = {
  loading: false,
  order: "-spent_at",
  currency: "",
  spendingsErrorMessage: "",
  spendings: [],
};

export const fetchSpendingsBy = createAsyncThunk(
  "spending/fetchSpendingsBy",
  async (payload) => {
    return getSpendingsBy(payload?.order, payload?.currency);
  }
);

export const createNewSpending = createAsyncThunk(
  "spending/createNewSpending",
  async (spending, thunkApi) => {
    const { dispatch } = thunkApi;
    const { order, currency } = thunkApi.getState().spending;
    const newSpending = await addNewSpending(spending);
    if (newSpending) {
      dispatch(fetchSpendingsBy({ order, currency }));
    }
    return newSpending;
  }
);

export const spendingSlice = createSlice({
  name: "spending",
  initialState,
  reducers: {
    changeCurrencyFilter: (state, action) => {
      state.currency = action.payload;
    },
    changeOrder(state, action) {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpendingsBy.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpendingsBy.fulfilled, (state, action) => {
        state.loading = false;
        state.spendings = action.payload;
      })
      .addCase(fetchSpendingsBy.rejected, (state) => {
        state.loading = false;
        state.spendingsErrorMessage = "Cannot fetch spendings";
      })
      .addCase(createNewSpending.fulfilled, (state, action) => {});
  },
});

export const { changeCurrencyFilter, changeOrder } = spendingSlice.actions;

export default spendingSlice.reducer;
