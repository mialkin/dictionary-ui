import WordsList from "@/app/(words)/words/components/words-list";
import WordsSearchbar from "@/app/(words)/words/components/words-searchbar";

export default function Words() {
    return (
        <div>
            <WordsSearchbar />
            <WordsList />
        </div>
    );
}
