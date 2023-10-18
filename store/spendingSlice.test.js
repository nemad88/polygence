import { configureStore } from "@reduxjs/toolkit";
import spendingSlice, {
  changeCurrencyFilter,
  changeOrder,
  initialState,
} from "./spendingSlice";

describe("spendingSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      initialState,
      reducer: {
        spending: spendingSlice,
      },
    });
  });

  it("should handle initial state", () => {
    const { spending } = store.getState();
    expect(spending.currency).toEqual("");
    expect(spending.order).toEqual("-spent_at");
    expect(spending.loading).toEqual(false);
    expect(spending.spendings).toEqual(null);
    expect(spending.spendingsErrorMessage).toEqual("");
  });

  it("should handle changeCurrencyFilter", () => {
    store.dispatch(changeCurrencyFilter("USD"));
    const { spending } = store.getState();
    expect(spending.currency).toEqual("USD");
  });

  it("should handle changeOrder", () => {
    store.dispatch(changeOrder("desc"));
    const { spending } = store.getState();
    expect(spending.order).toEqual("desc");
  });
});
