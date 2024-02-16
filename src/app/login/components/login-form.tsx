'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <div>
                <input placeholder='Имя пользователя'
                       type='text'
                       name='username'
                       onInput={event => {
                           let target = event.target as HTMLInputElement;
                           setUsername(target.value);
                       }}
                />
            </div>
            <div>
                <input placeholder='Пароль'
                       type='text'
                       name='password'
                       onInput={event => {
                           let target = event.target as HTMLInputElement;
                           setPassword(target.value);
                       }}
                />
            </div>
            <div>
                <button type='button'
                        onClick={async () => {
                            let success = await loginUser(username, password)
                            if (success) {
                                router.push('/words')
                            }
                        }}>
                    Войти
                </button>
            </div>
        </div>
    );
}

async function loginUser(username: string, password: string) {

    const rawFormData = {
        username: username,
        password: password
    }

    let url = new URL('api/auth/login', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL)

    const response = await fetch(url.toString(), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
    });

    return response.status == 200;
}
