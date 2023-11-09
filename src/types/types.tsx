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
export interface UserData {
    id: number | undefined,
    created_at: string | undefined,
    name: string,
    email: string,
    birth_date: string,
    passage_user_id: string,
    zodiac_sign: string,
    last_cycle_start: string,
    last_cycle_length: number
}

export interface Insights {
    data: {
        moonPhase: string,
        horoscope: string,
        mood: string,
        exercise: string
    }
}

export type AuthProps = {
    isAuthorized: boolean;
    data?: UserData[] | null | undefined
};
  
export interface Horoscope {
    created_at: string
    date: string
    description: string
    id: number
    zodiac_sign: string
};  
