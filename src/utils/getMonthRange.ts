import formatDateString from "./formatDateString";

function getMonthRange(date: Date): [string, string] {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    // Calculate the starting date of the month
    const startingDate = new Date(year, month, 1);
  
    // Calculate the ending date of the month
    const endingDate = new Date(
      year,
      month,
      new Date(year, month + 1, 0).getDate()
    );
  
    return [formatDateString(startingDate), formatDateString(endingDate)];
  }

  
  export default getMonthRange;