// FILEPATH: /Users/adamnemeth/Documents/dev/polygence/components/filters.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Filters from "./filters";
import { rootReducer } from "../store/store";

const initialState = {
  spending: {
    loading: false,
    order: "-spent_at",
    currency: "",
    spendingsErrorMessage: "",
    spendings: null,
  },
};

const renderWithRedux = (component, state = initialState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: state,
  });

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Filters", () => {
  it("renders without crashing", () => {
    const { getByText } = renderWithRedux(<Filters />);
    expect(getByText(/Sort by Date descending/i)).toBeInTheDocument();
  });

  it("toggles dropdown visibility when button is clicked", () => {
    const { getByText } = renderWithRedux(<Filters />);
    const button = getByText(/Sort by Date descending/i);
    fireEvent.click(button);
    expect(getByText(/Sort by Date ascending/i)).toBeInTheDocument();
  });
});
