import { useState } from "react";
import { CURRENCIES } from "../helpers/utils";
import { Inter } from "next/font/google";
import NewSpend from "@/components/new-spend";
import Filters from "@/components/filters";
import SpendList from "@/components/spend-list";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { spendings } = props;

  const [spending, setSpending] = useState();
  const [amount, setAmount] = useState();
  const [newSpendCurrency, setNewSpendCurrency] = useState(CURRENCIES[1]);

  const [filteredCurrency, setFilteredCurrency] = useState("ALL");

 

  

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className} `}
    >
      <NewSpend />
      <Filters />
      <SpendList spendings={spendings} />
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
