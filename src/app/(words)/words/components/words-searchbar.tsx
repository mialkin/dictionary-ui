import styles from "./words-searchbar.module.css"

export default function WordsSearchbar() {
    return <>
        <div className={styles.searchbar}>
            <input
                placeholder="Найти..."
                autoFocus />
            {/* TODO   Change color of autofocused input with styles*/}
        </div>
    </>
}