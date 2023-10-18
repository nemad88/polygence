import { useState, useRef } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { changeCurrencyFilter, changeOrder } from "@/store/spendingSlice";
import { useDispatch, useSelector } from "react-redux";

const baseStyle = "rounded-lg shadow-lg p-4";
const hoverStyle = "hover:bg-sky-200 hover:text-sky-700";
const flexStyle = "flex-grow bg-white text-left";

const basicStyle = `${baseStyle} ${flexStyle}`;
const filterButtonInactive = `${basicStyle} ${hoverStyle}`;
const filterButtonActive = `${basicStyle} bg-sky-200 font-bold ${hoverStyle}`;
const dropdownStyle = `${basicStyle} absolute w-full left-0 top-[100%] mt-2 bg-white rounded-lg p-2`;
const dropdownItemStyle = `cursor-pointer ${hoverStyle} hover:rounded-lg p-2`;

const CURRENCY_FILTERS = ["ALL", "USD", "HUF"];
const ORDER_FILTERS = {
  "-spent_at": "Sort by Date descending (default)",
  spent_at: "Sort by Date ascending",
  amount: "Sort by Amount Ascending",
  "-amount": "Sort by Amount Descending",
};

export default function Filters() {
  // STATE
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // REDUX
  const dispatch = useDispatch();

  const { currency: currencyFromRedux, order } = useSelector(
    (state) => state.spending
  );

  // OTHER HOOKS
  const dropdownRef = useRef();

  useOutsideClick(dropdownRef, () => {
    if (dropdownVisible) setDropdownVisible(false);
  });

  // HANDLER FUNCTIONS
  const handleOrderChange = (order) => {
    dispatch(changeOrder(order));
    setDropdownVisible(false);
  };

  const handleCurrencyFilterChange = (currency) => {
    dispatch(changeCurrencyFilter(currency));
  };

  return (
    <div className="flex justify-between mt-16 w-[800px]">
      <div>
        <div ref={dropdownRef} className="relative flex min-w-[300px]">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            type="button"
            className={`${basicStyle} flex-grow bg-white text-left`}
          >
            {ORDER_FILTERS[order]}
          </button>
          {dropdownVisible && (
            <ul className={dropdownStyle}>
              <li
                className={dropdownItemStyle}
                onClick={() => handleOrderChange("-spent_at")}
              >
                Sort by Date descending
              </li>
              <li
                className={dropdownItemStyle}
                onClick={() => handleOrderChange("spent_at")}
              >
                Sort by Date ascending
              </li>
              <li
                className={dropdownItemStyle}
                onClick={() => handleOrderChange("amount")}
              >
                Sort by Amount Ascending
              </li>
              <li
                className={dropdownItemStyle}
                onClick={() => handleOrderChange("-amount")}
              >
                Sort by Amount Descending
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="relative flex space-x-4">
        {CURRENCY_FILTERS.map((currency) => {
          let style;

          if (!currencyFromRedux) {
            style =
              currency.toLowerCase() === "all"
                ? filterButtonActive
                : filterButtonInactive;
          } else {
            style =
              currencyFromRedux.toLowerCase() === currency.toLowerCase()
                ? filterButtonActive
                : filterButtonInactive;
          }

          return (
            <button
              onClick={() => {
                handleCurrencyFilterChange(currency);
              }}
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
