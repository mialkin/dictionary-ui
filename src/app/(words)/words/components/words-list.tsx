'use client'

import { useEffect, useState } from "react";
import { Word } from "@/app/(words)/words/types/types";

export default function WordsList({ languageId, term }: { languageId: number, term: string }) {
    // TODO responses from server can come at different sequence if user types quickly.
    // Preserve sequence

    const [data, setData] = useState<any>(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        console.log('Fetching inside useEffect')

        fetch('http://localhost:2100/api/words/search?languageId=1&term=a')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    // TODO Show spinner? 
    if (isLoading) return <p>Загрузка...</p> 

    // TODO Do I need this?
    if (!data) return <p>Нет данных</p>
    
    // TODO Create site map and forbid search engines crawl user's dictionaries
    function getTranscription(word: Word) {
        return <>&nbsp;<span className={"word__transcription"}>/{word.transcription}/</span>&nbsp;</>;
    }

    const list = data.result.map((word: Word) =>
        <div key={word.id} className={"word"}>
            <b>{word.name}</b>
            {word.transcription == null ? ' ' : getTranscription(word)}
            — {word.translation}
        </div>
    );

    return <div>{list}</div>;
}