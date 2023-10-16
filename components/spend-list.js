import { checkIsSpendingValid, getFormattedDate } from "../helpers/utils";

export default function SpendList({ spendings }) {
  const icons = {
    usd: "$",
    huf: "Ft",
  };

  const basicStyle = "rounded-lg shadow-lg p-4";
  const filterButtonActive = `${basicStyle} flex-grow bg-sky-200 font-bold text-left text-sky-700`;
  const listStyle = `flex flex-col mt-6 w-[800px]`;
  const listRowStyle = `flex flex-row justify-between items-center rounded-lg shadow-lg mb-4 bg-white w-full h-20 p-4`;

  return (
    <ul className={`${listStyle} `}>
      {spendings
        .slice(0, 20)
        .filter(checkIsSpendingValid)
        .map((spending) => {
          return (
            <li className={listRowStyle} key={spending.id}>
              <div className="flex flex-row justify-between items-center">
                <div
                  className={`${filterButtonActive} mr-4 flex justify-center items-center w-10 h-10 text-xl`}
                >
                  {icons[spending.currency.toLowerCase()]}
                </div>
                <div>
                  <h3 className="font-bold">{spending.description}</h3>
                  <h4 className="text-slate-400">
                    {getFormattedDate(spending.spent_at)}
                  </h4>
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
