const zodiacSigns = [
    { sign: "Capricorn", start: 1222, end: 119 },
    { sign: "Aquarius", start: 120, end: 218 },
    { sign: "Pisces", start: 219, end: 320 },
    { sign: "Aries", start: 321, end: 419 },
    { sign: "Taurus", start: 420, end: 520 },
    { sign: "Gemini", start: 521, end: 620 },
    { sign: "Cancer", start: 621, end: 722 },
    { sign: "Leo", start: 723, end: 822 },
    { sign: "Virgo", start: 823, end: 922 },
    { sign: "Libra", start: 923, end: 1022 },
    { sign: "Scorpio", start: 1023, end: 1121 },
    { sign: "Sagittarius", start: 1122, end: 1221 }
  ];

export const getZodiacSign = (birthday: string) => {
    const month = birthday.split('/')[0]
    const day = birthday.split('/')[1]
    const date = parseInt(`${month}${day}`)

    const mySign = zodiacSigns.filter(sign => date >= sign.start && date <= sign.end)

    if(mySign.length === 0) {
        return "capricorn"
    } else {
        return mySign[0].sign.toLowerCase()
    }
}

export const getTodaysDate = (currentDate: any)  => {
  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    return `${months[currentDate.getMonth()]} ${currentDate.getDate()} ${currentDate.getFullYear()}`
}

export const convertStringToDate = (dateString: string): Date => {
  const dateComponents = dateString.split('-');

  const day = parseInt(dateComponents[1], 10);
  const month = parseInt(dateComponents[0], 10) - 1;
  const year = parseInt(dateComponents[2], 10);

  const date = new Date(year, month, day);

  return date;
}
