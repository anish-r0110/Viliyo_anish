 const getCurrentTime = (): string => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? "pm" : "am";
    // Convert hours to 12-hour format
    hours = hours % 12 || 12;
    // Pad single-digit minutes with a leading zero
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    // Construct the formatted time string
    const formattedTime = `${hours}:${formattedMinutes} ${period}`;
    return formattedTime;
  };

  export default getCurrentTime;