import React, { useContext } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../UserContext';

const LoginPage = () => {

    // URL
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false); // Pour la redirection une fois connecter
    const { setUserInfo } = useContext(UserContext)

    async function login(e) {
        e.preventDefault();

        const response = await fetch(`${SERVER_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include' // Pour save les cookies dans le navigateur
        });

        // Si la réponse est OK on passe le setRedirect en true
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        } else {
            alert('Mauvais identifiants')
        }

    }

    // Si la variable redirect === true alors on redirige vers la homePage
    if (redirect === true) {
        return <Navigate to={'/'} />
    }


    return (
        <form className='login' onSubmit={login}>
            <h1>../r00t/🤖</h1><br /><br />
            <input type="text"
                placeholder='Votre email'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input type="password"
                placeholder='Votre mot de passe'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button>Se connecter</button>
        </form>
    )
}

export default LoginPage