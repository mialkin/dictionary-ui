import WordsList from "@/app/(words)/words/components/words-list";
import WordsSearchbar from "@/app/(words)/words/components/words-searchbar";
import WordsDictionarySelector from "@/app/(words)/words/components/words-dictionary-selector";

export default function Words() {
    return (
        <div>
            <WordsDictionarySelector />
            <WordsSearchbar />
            <WordsList />
        </div>
    );
}
