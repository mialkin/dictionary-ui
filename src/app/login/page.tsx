import Link from "next/link";
import { loginUser } from "@/app/lib/actions";

export default function Login() {
    return (
        <div>
            <h1>Страница входа</h1>

            <form action={loginUser}>
                <div>
                    <input placeholder='Имя пользователя'
                           type='text'
                           name='username' />
                </div>
                <div>
                    <input placeholder='Пароль'
                           type='text'
                           name='password' />
                </div>
                <div>
                    <button type='submit'>Войти</button>
                </div>
            </form>

            <Link href="/">На главную</Link>
        </div>
    );
}
