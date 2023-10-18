export type Indexable = {
    [key: string]: any
}

export type selectionType = Indexable & {
    FLOW: null | string,
    MOOD: null | string,
    CRAVINGS: null | string
}

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