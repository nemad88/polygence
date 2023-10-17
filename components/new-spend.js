import { useState, useRef } from "react";
import { CURRENCIES } from "../helpers/utils";
import { addNewSpending } from "@/helpers/api-utils";
import useOutsideClick from "../hooks/useOutsideClick";

const basicStyle = "rounded-lg shadow-lg p-4";
const dropdownStyle = `absolute w-full left-0 top-[100%] mt-2 bg-white rounded-lg p-2`;

export default function NewSpend() {
  const [newSpendDescription, setNewSpendDescription] = useState("");
  const [newSpendAmount, setNewSpendAmount] = useState(0);
  const [newSpendCurrency, setNewSpendCurrency] = useState(CURRENCIES[1]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const ref = useRef();

  useOutsideClick(ref, () => {
    if (dropdownVisible) setDropdownVisible(false);
  });

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

    addNewSpending(newSpending);

    setNewSpendDescription("");
    setNewSpendAmount(0);
  };

  return (
    <form className="w-[800px] z-20" onSubmit={handleNewSpendSubmit}>
      <div className="flex w-full  space-x-4">
        <input
          type="search"
          placeholder="description"
          value={newSpendDescription}
          onChange={(e) => setNewSpendDescription(e.target.value)}
          className={`${basicStyle} w-3/6`}
        ></input>
        <input
          type="number"
          className={`${basicStyle} w-1/6 `}
          placeholder="0"
          value={newSpendAmount}
          onChange={(e) => setNewSpendAmount(e.target.value)}
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
              {CURRENCIES.slice(1).map((currency) => {
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
