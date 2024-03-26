export type Word = {
    id: string;
    name: string;
    transcription?: string;
    gender: WordGender;
    translation: string;
}

export type WordGender = {
    masculine: boolean;
    feminine: boolean;
    neuter: boolean;
}