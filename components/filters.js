import { useState, useRef } from "react";
import { CURRENCIES } from "../helpers/utils";
import {
  basicStyle,
  filterButtonActive,
  filterButtonInactive,
  dropdownStyle,
} from "../helpers/style";
import useOutsideClick from "@/hooks/useOutsideClick";

export default function Filters() {
  const [filteredCurrency, setFilteredCurrency] = useState("ALL");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sortBy, setSortBy] = useState("date-descending");

  const handleSortChange = (currency) => {
    setDropdownVisible(false);
  };

  const dropdownRef = useRef();

  useOutsideClick(dropdownRef, () => {
    if (dropdownVisible) setDropdownVisible(false);
  });

  const dropdownItemStyle =
    "cursor-pointer hover:bg-sky-200 hover:text-sky-700 hover:rounded-lg p-2";

  return (
    <div className="flex justify-between mt-16 w-[800px]">
      <div>
        <div ref={dropdownRef} className="relative flex">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            type="button"
            className={`${basicStyle} flex-grow bg-white text-left`}
          >
            Sort by Date descending (default)
          </button>
          {dropdownVisible && (
            <ul className={dropdownStyle}>
              <li className={dropdownItemStyle} onClick={handleSortChange}>
                Sort by Date ascending
              </li>
              <li className={dropdownItemStyle} onClick={handleSortChange}>
                Sort by Amount
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="relative flex space-x-4">
        {CURRENCIES.map((currency) => {
          const style =
            currency === filteredCurrency
              ? filterButtonActive
              : filterButtonInactive;

          return (
            <button
              onClick={() => setFilteredCurrency(currency)}
              className={style}
              key={currency}
            >
              {currency}
            </button>
          );
        })}
      </div>
    </div>
  );
}
