import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const PostPage = () => {

    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const { userInfo } = useContext(UserContext); // On récupère les données users pour pouvoir éditer
    // URL
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        fetch(`${SERVER_URL}/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                })
            })
    }, [])

    // Fonction pour supprimer l'article
    const handleDelete = (id) => {
        const response = fetch(`${SERVER_URL}/post/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        // Si la réponse est ok alors on passe la valeur à true
        if (response.ok) {
            setRedirect(true)
        }
    };

    // Si l'article a bien été supprimer on redirige vers la homepage
    if (redirect) {
        return <Navigate to={'/'} />
    }


    if (!postInfo) return '';

    return (
        <div className='post-page'>
            {/*<h1 className='title-post'>_{postInfo.title}</h1>*/}
            <center>
                <img style={{ borderRadius: '10px', width: '50%' }} src={`${SERVER_URL}/${postInfo.cover}`} alt="" /><br /><br /><br /><br />
            </center>
            <div className='content'>
                <p dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </div><br />
            {/* Vérifier si l'userInfo est le même que celui qui a poster l'article */}
            {userInfo.id === postInfo.author._id && (
                <div className='edit-container'>
                    <button className='rainbow'><Link to={`/edit/${postInfo._id}`}>✏️ Editer l'article</Link></button>
                    <button className='rainbow' onClick={e => handleDelete(postInfo._id)}>❌ Supprimer l'article</button>
                </div>
            )}
        </div>
    )
}

export default PostPage