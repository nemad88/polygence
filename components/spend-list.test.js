import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SpendList from "./spend-list";
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

describe("SpendList", () => {
  it("renders without crashing", () => {
    const { getByText } = renderWithRedux(<SpendList />);
    expect(getByText("No spendings found")).toBeInTheDocument();
  });

  it("displays a loader when loading", async () => {
    const { getByTestId } = renderWithRedux(<SpendList />, {
      spending: { ...initialState.spending, loading: true },
    });

    expect(getByTestId("loader-id")).toBeInTheDocument();
  });

  it("displays an error message when there is an error", () => {
    const { getByText } = renderWithRedux(<SpendList />, {
      spending: { ...initialState.spending, errorMessage: "Error message" },
    });
    expect(getByText("Error message")).toBeInTheDocument();
  });

  it("renders the list of spendings", () => {
    const spendings = [
      {
        id: "1",
        description: "Test spending 1",
        amount: 100,
        currency: "usd",
        spent_at: "2022-01-01",
      },
      {
        id: "2",
        description: "Test spending 2",
        amount: 200,
        currency: "huf",
        spent_at: "2022-01-02",
      },
    ];
    const { getByText } = renderWithRedux(<SpendList />, {
      spending: { spendings },
    });
    expect(getByText("Test spending 1")).toBeInTheDocument();
    expect(getByText("Test spending 2")).toBeInTheDocument();
  });
});
