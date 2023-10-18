import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSpendingsErrorMessage } from "@/store/spendingSlice";

export default function ErrorMessage() {
  const { spendingsErrorMessage } = useSelector((state) => state.spending);
  const dispatch = useDispatch();

  useEffect(() => {
    let timerId;
    if (spendingsErrorMessage) {
      timerId = setTimeout(() => {
        dispatch(clearSpendingsErrorMessage());
      }, 3000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [spendingsErrorMessage, dispatch]);

  if (!spendingsErrorMessage) {
    return <></>;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-300 flex justify-center text-white font-bold">
      {spendingsErrorMessage}
    </div>
  );
}
