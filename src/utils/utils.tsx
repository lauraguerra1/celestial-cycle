export const DEMO_USER_ID = "ABrrCENR3M0I6XZ7NLA7gNCY";

export const mapUserSignToHoroscopeSign = (sign: string) => `${sign[0].toUpperCase()}${sign.substring(1)}`;

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
  
  
export const formSections = [
  { title: 'FLOW', options: ['No Flow', 'Spotting', 'Light', 'Medium', 'Heavy', 'Super'] },
  { title: 'MOOD', options: ['Happy', 'Relaxed', 'Grateful', 'Confident', 'Fatigued', 'Angry', 'Anxious', 'Depressed', 'Annoyed'] },
  { title: 'CRAVINGS', options: ['Sweet', 'Salty', 'Sour', 'Chocolate', 'Dairy', 'Fried', 'Fats', 'Carbs', 'Protein', 'Alcohol', 'Nicotine'] }
]

export const getZodiacSign = (birthday: string | number | boolean | undefined) => {
    const birthdayString = birthday?.toString();
    const month = birthdayString?.split('-')[1];
    const day = birthdayString?.split('-')[2];
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

export const formatDateForDB = (date: Date) => {
  return `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`
}

export const isDateInFuture = (entryDate: Date) => {
  const currentDate = new Date().setHours(0,0,0,0)
  const comparisonDate = new Date(entryDate).setHours(0,0,0,0)
  return comparisonDate >= currentDate
}

export const formatDateQuery = (date: Date, num: number) => {
  return `${date.getMonth()+1}-${date.getDate()+num}-${date.getFullYear()}`
}