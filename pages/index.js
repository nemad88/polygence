import { Inter } from "next/font/google";
import NewSpend from "@/components/new-spend";
import Filters from "@/components/filters";
import SpendList from "@/components/spend-list";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { fetchSpendingsBy, fetchAllSpending } from "@/store/spendingSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { order, currency, loading } = useSelector((state) => state.spending);

  useEffect(() => {
    dispatch(
      fetchSpendingsBy({
        order,
        currency,
      })
    );
  }, [order, currency, dispatch]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className} `}
    >
      <NewSpend />
      <Filters />
      <SpendList />
    </main>
  );
}
