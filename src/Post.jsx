import React from 'react'
import { format } from "date-fns";
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


// URL
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Post = ({ _id, title, summary, cover, createdAt, author }) => {

    //Pour utiliser AOS
    useEffect(() => {
        AOS.init({ once: true }); // Pour avoir l'animation qu'une fois
    }, [])


    return (
        <div data-aos='zoom-in' className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={`${SERVER_URL}/${cover}`} alt="" />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <time>Publié le {format(new Date(createdAt), "dd-MM-yyyy")}  par unkn0w_ind</time> {/* Pour afficher la date */}
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    )
}

export default Post