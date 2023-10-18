import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import NewSpend from "./new-spend";
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

describe("NewSpend", () => {
  it("renders without crashing", () => {
    const { getByPlaceholderText } = renderWithRedux(<NewSpend />);
    expect(getByPlaceholderText("description")).toBeInTheDocument();
    expect(getByPlaceholderText("0")).toBeInTheDocument();
  });

  it("handles form submission", () => {
    const { getByPlaceholderText, getByText } = renderWithRedux(<NewSpend />);
    const descriptionInput = getByPlaceholderText("description");
    const amountInput = getByPlaceholderText("0");
    const saveButton = getByText("Save");

    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });
    fireEvent.change(amountInput, { target: { value: "100" } });
    fireEvent.click(saveButton);

    expect(descriptionInput.value).toBe("");
    expect(amountInput.value).toBe("0");
  });

  it("toggles dropdown visibility when button is clicked", () => {
    const { getByText } = renderWithRedux(<NewSpend />);
    const dropdownButton = getByText(/USD/);
    fireEvent.click(dropdownButton);
    expect(getByText(/HUF/)).toBeInTheDocument();
  });
});
