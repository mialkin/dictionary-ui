'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {

    const rawFormData = {
        username: formData.get('username'),
        password: formData.get('password')
    }

    let url = new URL('api/auth/login', process.env.SERVER_GATEWAY_API_URL)

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
    });

    if (response.status == 200) {
        console.log('Success')
        
        // cookies().set('set-cookie', response.headers.get('set-cookie')!)
        redirect('/words');
        
    } else if (response.status == 400) {
        console.log('Invalid credentials')
    }
}
