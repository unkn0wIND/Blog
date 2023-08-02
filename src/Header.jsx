import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "./UserContext"

const Header = () => {

    const { setUserInfo, userInfo } = useContext(UserContext);

    // Ceci est run à chaque fois que l'header est mount
    // Cela permet de récupérer nos cookies puis vérifier si l'user est connecter ou pas
    useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_URL, {
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, [])

    // Fonction pour la déconnexion
    function logout() {
        fetch(import.meta.env.VITE_SERVER_URL, {
            credentials: 'include',
            method: 'POST'
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">#dp-Blog</Link>
            <nav>
                {/* Vérification si on a bien un username(utilisateur connecter)*/}
                {username && (
                    <>
                        <button className='rainbow'><Link to="/create">Crée un article</Link></button>
                        <button className='rainbow'><a onClick={logout}>Déconnexion</a></button>
                    </>
                )}
                {!username && (
                    <>
                        <button className='rainbow'><Link to="/login">Connexion</Link></button>
                        {/* <Link to="/register">Inscription</Link> */}

                    </>
                )}
            </nav>
        </header>
    )
}

export default Header