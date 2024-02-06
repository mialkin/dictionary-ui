import WordsList from "@/app/(words)/words/components/words-list";
import WordsSearchbar from "@/app/(words)/words/components/words-searchbar";

export default function Words({ searchParams, }: { searchParams?: { term?: string; language?: number; }; }) {

    let languageId = searchParams?.language || 1;
    const term = searchParams?.term || '';

    return (
        <div>
            <WordsSearchbar />
            <WordsList languageId={languageId} term={term} />
        </div>
    );
}
