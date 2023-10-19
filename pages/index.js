import { Inter } from "next/font/google";
import NewSpend from "@/components/new-spend";
import Filters from "@/components/filters";
import SpendList from "@/components/spend-list";
import ErrorMessage from "@/components/error-message";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className} `}
    >
      <ErrorMessage />
      <NewSpend />
      <Filters />
      <SpendList />
    </main>
  );
}
