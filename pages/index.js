import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { spendings } = props;

  const currencies = ["ALL", "HUF", "USD"];

  const [spending, setSpending] = useState();
  const [amount, setAmount] = useState();
  const [newSpendCurrency, setNewSpendCurrency] = useState(currencies[1]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredCurrency, setFilteredCurrency] = useState("ALL");

  const icons = {
    usd: "$",
    huf: "Ft",
  };

  const inputClassNames = "rounded-lg shadow-lg px-2 py-1";
  const filterButtonInactive = `${inputClassNames} flex-grow bg-white text-left`;
  const filterButtonActive = `${inputClassNames} flex-grow bg-sky-200 font-bold text-left text-sky-700`;
  const listStyle = `flex flex-col mt-6 w-[800px]`;
  const listRowStyle = `flex flex-row justify-between rounded-lg shadow-lg mb-4 px-4 py-4 bg-white w-full`;

  const handleNewSpendCurrencyChange = (currency) => {
    setNewSpendCurrency(currency);
    setDropdownVisible(false);
  };

  const checkIsSpendingValid = (spending) => {
    for (const key in spending) {
      if (
        spending[key] === false ||
        spending[key] === 0 ||
        spending[key] === null ||
        spending[key] === undefined
      ) {
        return false;
      }
    }
    return true;
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    const datePart = date.toLocaleDateString("en-US", options);
    const timePart = date.toLocaleTimeString("en-US", timeOptions);

    return `${timePart} - ${datePart}`;
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className} `}
    >
      <form className="w-[800px] z-20">
        <div className="flex w-full  space-x-4">
          <input
            type="search"
            placeholder="description"
            className={`${inputClassNames} w-3/6`}
          ></input>
          <input
            className={`${inputClassNames} w-1/6 `}
            placeholder="0"
          ></input>
          <div className="relative flex-grow flex">
            <button
              onClick={() => setDropdownVisible(!dropdownVisible)}
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              type="button"
              className={`${inputClassNames} flex-grow bg-white font-bold text-left`}
            >
              {newSpendCurrency}
            </button>

            {dropdownVisible && (
              <ul className="absolute left-0 mt-9 bg-white rounded-lg p-2">
                {currencies.slice(1).map((currency) => {
                  return (
                    <li
                      className="cursor-pointer hover:bg-emerald-500 hover:text-white hover:rounded-lg hover:shadow-lg px-2 py-1 "
                      key={currency}
                      onClick={() => handleNewSpendCurrencyChange(currency)}
                    >
                      {currency}
                    </li>
                  );
                })}

                {/* <li onClick={() => handleNewSpendCurrencyChange("HUF")}>HUF</li> */}
              </ul>
            )}
          </div>
          <button
            className={`${inputClassNames} flex-grow bg-emerald-500 font-bold text-white`}
          >
            Save
          </button>
        </div>
      </form>

      <div className="flex justify-between mt-16 w-[800px]">
        <div>
          <div className="relative flex">
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              type="button"
              className={`${inputClassNames} flex-grow bg-white text-left`}
            >
              Sort by Date descending (default)
            </button>
            {/* <ul className="absolute left-0 mt-10 bg-white rounded-lg p-2">
                <li>Sort by Date ascending</li>
                <li>Sort by Amount</li>
              </ul> */}
          </div>
        </div>
        <div className="relative flex space-x-4">
          {currencies.map((currency) => {
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

      <ul className={`${listStyle} `}>
        {spendings
          // .slice(0, 20)
          .filter(checkIsSpendingValid)
          .map((spending) => {
            const date = new Date(spending.spent_at);
            return (
              <li className={listRowStyle} key={spending.id}>
                <div className="flex flex-row justify-between">
                  <div
                    className={`${filterButtonActive} mr-4 flex justify-center items-center w-10 h-10 text-xl`}
                  >
                    {icons[spending.currency.toLowerCase()]}
                  </div>
                  <div>
                    <h3>{spending.description}</h3>
                    <h4>{getFormattedDate(spending.spent_at)}</h4>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex justify-center items-center w-10 h-10 text-xl">
                    $12.00
                  </div>
                  <div className="flex space-x-4 text-xl justify-center">
                    <div className="flex justify-center items-center w-10 h-10 text-xl">
                      ✎
                    </div>
                    <div className="flex justify-center items-center w-10 h-10 text-xl">
                      x
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </main>
  );
}

export async function getServerSideProps() {
  const URL =
    "https://shielded-depths-43687-bb049deacd16.herokuapp.com/spendings/";
  const res = await fetch(URL);
  const spendings = await res.json();
  return { props: { spendings } };
}
