'use client'

import { redirect, useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter()

    return (
        <div>
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
                <button type='button'
                        onClick={async () => {
                            let success = await loginUser()
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

async function loginUser() {

    const rawFormData = {
        username: 'admin',
        password: 'password'
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
