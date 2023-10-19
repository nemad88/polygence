export const checkIsSpendingValid = (spending) => {
  for (const key in spending) {
    if (
      spending[key] === false ||
      spending[key] === 0 ||
      spending[key] <= 0 ||
      spending[key] === null ||
      spending[key] === undefined
    ) {
      return false;
    }
  }
  return true;
};

export const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

  const datePart = date.toLocaleDateString("en-US", options);
  const timePart = date.toLocaleTimeString("en-US", timeOptions);

  return `${timePart} - ${datePart}`;
};

export const getFormattedAmount = (amount, currency) => {  
  if (currency === "USD") {
    return `$${amount}`;
  }
  return `${amount} Ft`;
};
