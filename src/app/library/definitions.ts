export interface Word {
    id: string;
    name: string;
    translation: string;
    transcription: string;
}

export type Envelope = {
    result: object,
    errorCode: string,
    errorMessage: string,
    invalidField: string,
    timeGenerated: Date
}