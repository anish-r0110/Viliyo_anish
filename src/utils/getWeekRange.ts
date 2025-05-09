import { format, addDays, subDays } from 'date-fns';

function getWeekRange(date: Date):[ string , string] {
  // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = date.getDay();

  // Calculate the start date of the week (Sunday)
  const startDate = subDays(date, dayOfWeek);

  // Calculate the end date of the week (Saturday)
  const endDate = addDays(startDate, 6);

  // Format the dates as strings
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');

  return [
     formattedStartDate,
     formattedEndDate,
  ]
}


export default getWeekRange;
