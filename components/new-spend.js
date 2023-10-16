import { useState, useRef } from "react";
import { basicStyle, dropdownStyle } from "../helpers/style";
import { CURRENCIES } from "../helpers/utils";
import useOutsideClick from "../hooks/useOutsideClick";

export default function NewSpend() {
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

  return (
    <form className="w-[800px] z-20">
      <div className="flex w-full  space-x-4">
        <input
          type="search"
          placeholder="description"
          className={`${basicStyle} w-3/6`}
        ></input>
        <input className={`${basicStyle} w-1/6 `} placeholder="0"></input>
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
          className={`${basicStyle} flex-grow bg-emerald-500 font-bold text-white`}
        >
          Save
        </button>
      </div>
    </form>
  );
}
