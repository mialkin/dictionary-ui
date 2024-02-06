import Link from "next/link";
import styles from './page.module.css'

export default function EditWord({ params }: { params: { id: string } }) {
    const id = params.id;
    
    return (
        <div>
            <div className={styles.breadcrumbs}>
                <Link href='/words'>Слова</Link> / Редактировать
            </div>
            <form>
                <input name='name'/>
            </form>
            <div>
                На этой странице редактируется слово
            </div>
        </div>
    );
}
