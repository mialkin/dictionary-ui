export interface Word {
    id: string;
    name: string;
    transcription?: string;
    gender?: WordGender;
    translation: string;
}

export interface WordGender {
    masculine: boolean;
    feminine: boolean;
    neuter: boolean;
}