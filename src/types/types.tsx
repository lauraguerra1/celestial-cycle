export interface User {
    data: {
        name: string,
        birthday: string,
        userID: number,
        sign: string
    }
}

export interface Insights {
    data: {
        moonPhase: string,
        horoscope: string,
        mood: string,
        exercise: string
    }
}