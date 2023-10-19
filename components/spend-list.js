import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpendingsBy } from "@/store/spendingSlice";
import {
  checkIsSpendingValid,
  getFormattedDate,
  getFormattedAmount,
} from "../helpers/utils";
import Loader from "@/components/loader";

const basicStyle = "rounded-lg shadow-lg p-4";
const filterButtonActive = `${basicStyle} flex-grow bg-sky-200 font-bold text-left text-sky-700`;
const listStyle = `flex flex-col mt-6 w-[800px]`;
const listRowStyle = `flex flex-row justify-between items-center rounded-lg shadow-lg mb-4 bg-white w-full h-20 p-4`;
const controllerIcons = `${basicStyle} flex justify-center items-center w-10 h-10 text-[28px] bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-500 rounded-lg cursor-pointer`;

const ICONS = {
  usd: "$",
  huf: "Ft",
};

export default function SpendList() {
  // STATE
  const spendings = useSelector((state) => state.spending.spendings);
  const loading = useSelector((state) => state.spending.loading);
  const errorMessage = useSelector((state) => state.spending.errorMessage);
  // REDUX
  const dispatch = useDispatch();
  const { order, currency } = useSelector((state) => state.spending);

  // LOAD SPENDINGS
  useEffect(() => {
    dispatch(
      fetchSpendingsBy({
        order,
        currency,
      })
    );
  }, [order, currency, dispatch]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!spendings) {
    return <div>No spendings found</div>;
  }

  return (
    <ul className={`${listStyle} `}>
      {spendings.filter(checkIsSpendingValid).map((spending) => {
        return (
          <li className={listRowStyle} key={spending.id}>
            <div className="flex flex-row justify-between items-center">
              <div
                className={`${filterButtonActive} mr-4 flex justify-center items-center w-10 h-10 text-xl`}
              >
                {ICONS[spending.currency.toLowerCase()]}
              </div>
              <div>
                <h3 className="font-bold capitalize">{spending.description}</h3>
                <h4 className="text-slate-400">
                  {getFormattedDate(spending.spent_at)}
                </h4>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex justify-center items-center font-bold text-xl">
                {getFormattedAmount(spending.amount, spending.currency)}
              </div>
              <div className="flex space-x-1 text-xl justify-center">
                <div className={controllerIcons}>✎</div>
                <div className={controllerIcons}>x</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
