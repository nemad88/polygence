import { useState, useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { createNewSpending, raiseAnError } from "@/store/spendingSlice";
import { checkIsSpendingValid } from "@/helpers/utils";

const basicStyle = "rounded-lg shadow-lg p-4";
const dropdownStyle = `absolute w-full left-0 top-[100%] mt-2 bg-white rounded-lg p-2`;

const CURRENCIES = ["USD", "HUF"];

export default function NewSpend() {
  // STATE
  const [newSpendDescription, setNewSpendDescription] = useState("");
  const [newSpendAmount, setNewSpendAmount] = useState(0);
  const [newSpendCurrency, setNewSpendCurrency] = useState(CURRENCIES[0]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // REDUX
  const dispatch = useDispatch();

  // OTHER HOOKS
  const ref = useRef();

  useOutsideClick(ref, () => {
    if (dropdownVisible) setDropdownVisible(false);
  });

  // HANDLER FUNCTIONS
  const handleNewSpendCurrencyChange = (currency) => {
    setNewSpendCurrency(currency);
    setDropdownVisible(false);
  };

  const handleNewSpendSubmit = (e) => {
    e.preventDefault();

    const newSpending = {
      description: newSpendDescription,
      amount: newSpendAmount,
      currency: newSpendCurrency,
      spent_at: new Date().toISOString(),
    };

    if (checkIsSpendingValid(newSpending)) {
      dispatch(createNewSpending(newSpending));
      setNewSpendDescription("");
      setNewSpendAmount(0);
    } else {
      dispatch(raiseAnError("Please fill out all fields!"));
    }
  };

  return (
    <form className="w-[800px] z-20" onSubmit={handleNewSpendSubmit}>
      <div className="flex w-full  space-x-4">
        <input
          type="search"
          placeholder="description"
          value={newSpendDescription}
          onChange={(e) => {
            setNewSpendDescription(e.target.value);
          }}
          className={`${basicStyle} w-3/6`}
        ></input>
        <input
          type="number"
          min={0}
          className={`${basicStyle} w-1/6 `}
          placeholder="0"
          step={0.01}
          value={newSpendAmount}
          onChange={(e) => {
            setNewSpendAmount(e.target.value);
          }}
        ></input>
        <div ref={ref} className="relative flex-grow flex">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            type="button"
            className={`${basicStyle} flex-grow bg-white font-bold text-left p-2`}
          >
            {newSpendCurrency}
          </button>

          {dropdownVisible && (
            <ul className={dropdownStyle}>
              {CURRENCIES.map((currency) => {
                return (
                  <li
                    className="cursor-pointer hover:bg-emerald-500 hover:text-white hover:rounded-lg hover:shadow-lg p-2"
                    key={currency}
                    onClick={() => handleNewSpendCurrencyChange(currency)}
                  >
                    {currency}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className={`${basicStyle} flex-grow bg-emerald-500 font-bold text-white`}
        >
          Save
        </button>
      </div>
    </form>
  );
}
