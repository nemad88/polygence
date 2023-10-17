const URL =
  "https://shielded-depths-43687-bb049deacd16.herokuapp.com/spendings/";

export const getSpendingsBy = async (order, currency) => {
  const res = await fetch(`${URL}?order=${order}&currency=${currency}`);
  const spendings = await res.json();
  return spendings;
};

export const addNewSpending = async (spending) => {
  const res = await fetch(`${URL}`, {
    method: "POST",
    body: JSON.stringify(spending),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newSpending = await res.json();
  return newSpending;
};
