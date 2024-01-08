import './css/style.css'

async function listWords(languageId: number) {
    const response = await fetch(`http://localhost:2000/api/words/list?languageId=${languageId}`, {cache: "no-store"})
    return response.json()
}

export default async function Home() {
    const words = await listWords(1);

    return (
        <div>
            <h1>Главная страница</h1>
            <div className="rectangle">Прямоугольник</div>
            <div>
                {words.result.map((word: Word) => (
                    <div key={word.id}>
                        <b>{word.name}</b> /<i>{word.transcription}</i>/ — {word.translation}
                    </div>
                ))}</div>
        </div>
    )
}

interface Word {
    id: string;
    name: string;
    translation: string;
    transcription: string;
}
