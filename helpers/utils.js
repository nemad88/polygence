const usdToHuf = 350;

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
  } else if (currency === "HUF") {
    return `${amount} Ft`;
  }
};

export const sortSpendings = (spendings, sortBy) => {
  return spendings.sort((a, b) => {
    let amountAInHuf = a.amount;
    let amountBInHuf = b.amount;
    if (a.currency === "USD") {
      amountAInHuf *= usdToHuf;
    }
    if (b.currency === "USD") {
      amountBInHuf *= usdToHuf;
    }

    switch (sortBy) {
      case "date-descending":
        return new Date(b.spent_at) - new Date(a.spent_at);
      case "date-ascending":
        return new Date(a.spent_at) - new Date(b.spent_at);
      case "amount-ascending": {
        return amountAInHuf - amountBInHuf;
      }
      case "amount-descending": {
        return amountBInHuf - amountAInHuf;
      }
      default:
        return 0;
    }
  });
};
