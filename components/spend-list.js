import { listStyle, listRowStyle } from "../helpers/style";
import { checkIsSpendingValid, getFormattedDate } from "../helpers/utils";
import { filterButtonActive } from "../helpers/style";

export default function SpendList({ spendings }) {
  const icons = {
    usd: "$",
    huf: "Ft",
  };

  return (
    <ul className={`${listStyle} `}>
      {spendings
        .slice(0, 20)
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
  );
}
