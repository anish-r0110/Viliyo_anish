
function formatDateToDefault(input: any): string {
    // Create a new Date object from the input
    const date = new Date(input);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date input');
    }
  
    // Define month names
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    // Extract day, month, and year components
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    // Format the date as 'dd Mon yyyy'
    const formattedDate = `${day} ${month} ${year}`;
  
    return formattedDate;
  }

  export default formatDateToDefault;