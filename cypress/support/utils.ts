export const getTodaysDate = (currentDate: any)  => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      return `${months[currentDate.getMonth()]} ${currentDate.getDate()} ${currentDate.getFullYear()}`
  }