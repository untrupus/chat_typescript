export interface Message {
    date: Date,
    text: string,
    from: string,
    to: string
}

export type CallbackFunction = (value?: string) => void;