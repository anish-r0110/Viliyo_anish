
function calculateDurationInMinutes(start_time: string, end_time: string): number {
    const startTimeParts = start_time.split(':').map(Number);
    const endTimeParts = end_time.split(':').map(Number);
  
    const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
    const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
  
    return endMinutes - startMinutes;
  }

export default  calculateDurationInMinutes;