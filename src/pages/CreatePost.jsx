import React, { useState, useContext } from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'
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

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);


    // Fonction pour crée l'article et l'envoyer à l'API
    async function createNewPost(e) {

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        e.preventDefault();
        const response = await fetch(`${SERVER_URL}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include'
        })

        // Si la réponse est ok alors on passe la valeur à true
        if (response.ok) {
            setRedirect(true)
        }
    }

    // Si l'article a bien été poster on redirige vers la homepage
    if (redirect) {
        return <Navigate to={'/'} />
    }

    // On récupère les info user pour les autorisation
    const { userInfo } = useContext(UserContext);
    const username = userInfo?.username

    return (
        <>
            {username && (
                <>
                    <form className='create-post' onSubmit={createNewPost}>

                        <input type="title"
                            placeholder={"Titre de l'article"}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <input type="summary"
                            placeholder={'Description'}
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

                        <button style={{ marginTop: '5px' }}>Crée l'article</button>
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

export default CreatePost