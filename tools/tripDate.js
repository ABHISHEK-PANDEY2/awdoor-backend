function getDate(date, mode) {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateArr = date.split("/");
  if (mode === "train") {
    return dateArr.reverse().join("-");
  }
  if (mode === "flight") {
    return date;
  }
  if (mode === "bus") {
    return `${dateArr[0]}-${monthArr[+dateArr[1] - 1]}-${dateArr[2]}`;
  }
}

module.exports = getDate;
