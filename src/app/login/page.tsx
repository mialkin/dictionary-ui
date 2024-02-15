import Link from "next/link";

export default function Login() {
    return (
        <div>
            <h1>Страница входа</h1>
            <div>
                <input defaultValue='Имя пользователя'></input>
            </div>
            <div>
                <input defaultValue='Пароль'></input>
            </div>
            <div>
                <button>Войти</button>
            </div>

            <Link href="/">На главную</Link>
        </div>
    );
}
