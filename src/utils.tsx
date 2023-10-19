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

    if(currentDate)
    return `${months[currentDate.getMonth()]} ${currentDate.getDate()} ${currentDate.getFullYear()}`
  }
