const URL =
  "https://shielded-depths-43687-bb049deacd16.herokuapp.com/spendings";

export const getAllSpendings = async () => {
  //   const currency = "?currency=HUF";
  //   const order = "&order=spent_at";
  const currency = "";
  const order = "";
  const res = await fetch(`${URL}${currency}${order}`);
  const spendings = await res.json();
  return spendings;
};

export const addNewSpending = async (spending) => {
  const res = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(spending),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newSpending = await res.json();
  console.log(newSpending, "added");
  return newSpending;
};
