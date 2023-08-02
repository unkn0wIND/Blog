import React from 'react'
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'


const CustomColors = ['#4E4D4D', '#056bc4', '#BE5AF7', 'white']; // Couleur pour la toolbar

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: CustomColors }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color'
];


// URL
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const EditPost = () => {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                })
            })
    }, [])

    // Fonction pour update le post
    async function updatePost(e) {

        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }

        const response = await fetch(`${SERVER_URL}/post`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })

        if (response.ok) {
            setRedirect(true);
        }

    }

    // Si l'article a bien été editer on redirige vers la homepage
    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    // On récupère les info user pour les autorisation
    const { userInfo } = useContext(UserContext);
    const username = userInfo?.username


    return (

        <>
            {username && (
                <>
                    <form className='create-post' onSubmit={updatePost}>

                        <input type="title"
                            placeholder={'Title'}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <input type="summary"
                            placeholder={'Summary'}
                            value={summary}
                            onChange={e => setSummary(e.target.value)}
                        />

                        <input type="file"
                            onChange={e => setFiles(e.target.files)}
                        />

                        <ReactQuill value={content}
                            onChange={newValue => setContent(newValue)}
                            modules={modules}
                            formats={formats}
                        />

                        <button style={{ marginTop: '5px' }}>Editer l'article</button>
                    </form>
                </>
            )}

            {!username && (
                <>
                    <h1>404 ? Yeah. 404 !</h1>
                </>
            )}
        </>
    )
}

export default EditPost