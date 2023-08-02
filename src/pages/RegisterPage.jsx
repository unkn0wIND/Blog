import React from 'react'
import { useState } from 'react'

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // URL
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    // Fonction pour inscription
    async function register(e) {

        e.preventDefault(); // Empecher le refresh

        const response = await fetch(`${SERVER_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        //console.log(response) 
        // Si la réponse a le status 200..
        if (response.status === 200) {
            alert('Inscription réussie !')
        } else {
            alert('Inscription non réussie !')
        }

    }

    return (
        <form className='register' onSubmit={register}>
            <h1>Register</h1><br />

            <input type="text"
                placeholder='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <input type="password"
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button>Register</button>
        </form>
    )
}

export default RegisterPage