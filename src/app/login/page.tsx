import Link from 'next/link';
import LoginForm from '@/app/login/components/login-form';

export default function Login() {
    return (
        <div>
            <h1>Страница входа</h1>
            <LoginForm />
            <Link href="/">На главную</Link>
        </div>
    );
}
