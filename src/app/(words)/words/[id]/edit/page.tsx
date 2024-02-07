import Link from "next/link";
import styles from './page.module.css'

export default function EditWord({ params }: { params: { id: string } }) {
    const id = params.id;

    return (
        <div>
            <div className={styles.breadcrumbs}>
                <Link href='/words'>Слова</Link> / Редактировать
            </div>
            <div>
                <div>
                    <label>
                        Слово: <input name='name' />
                    </label>
                </div>
                <div>
                    <label>
                        Транскрипция: <input name='transcription' />
                    </label>
                </div>
                <div>
                    <label>
                        Перевод: <textarea name='translation' />
                    </label>
                </div>
                <div>
                    <button>Сохранить</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}
