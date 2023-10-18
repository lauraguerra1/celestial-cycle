import { Metadata, WebAuthnType } from "@passageidentity/passage-node"
import PassageDevice from "@passageidentity/passage-node"

export interface User {
    data: {
        name: string,
        birth_date: string,
        userID: number,
        zodiac_sign: string
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