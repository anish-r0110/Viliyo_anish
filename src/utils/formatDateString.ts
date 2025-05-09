//  send the date object as string to this function
function formatDateString(date: Date, type : number = 1): string {
    const year = date.getFullYear();
    const month = type==1 ? (date.getMonth() + 1).toString().padStart(2, "0") : date.toLocaleString('default', { month: 'long' }); // Use full month name
 
    const day = date.getDate().toString().padStart(2, "0");
    
    return type ==1 ? `${year}-${month}-${day}` : `${day}-${month}-${year}`;
  }


  export default formatDateString;