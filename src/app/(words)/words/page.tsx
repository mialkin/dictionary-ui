import WordsList from "@/app/(words)/words/components/words-list";
import WordsSearchbar from "@/app/(words)/words/components/words-searchbar";

export default function Words({ searchParams, }: { searchParams?: { q?: string; language?: number; }; }) {

    let languageId = searchParams?.language || 1;
    const query = searchParams?.q || '';

    return (
        <div>
            <WordsSearchbar />
            <WordsList languageId={languageId} query={query} />
        </div>
    );
}
