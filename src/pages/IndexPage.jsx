import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Post from '../Post'
import About from '../pages/About'

const IndexPage = () => {


    // URL
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => {
        fetch(`${SERVER_URL}/post?page=${pageNumber}`).then(response => { //ServerSide
            response.json()
                .then(({ totalPages, posts }) => {
                    setPosts(posts);
                    setNumberOfPages(totalPages); // On set le totalPages
                });
        })
    }, [pageNumber])

    return (
        <>
            <About />  <br /><br />

            <hr data-aos="zoom-in" data-aos-duration="1000" /><br /><br /><br /><br />

            {posts.length > 0 && posts.map(post => (
                <Post {...post} /> // On passe les propriété de notre post au composant
            ))}

            <br /><br />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {pages.map((pageIndex) => ( // Pagination
                    <button className='rainbow' onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
                ))}
            </div>

        </>
    )
}

export default IndexPage