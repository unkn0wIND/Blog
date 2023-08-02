import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { AiOutlineGlobal } from "react-icons/ai";


const Footer = () => {
    return (
        <div className='footer'>

            <div className="social">
                <a href="https://dev-pentest.fr"><AiOutlineGlobal /></a>
                <a href="https://github.com/unkn0wIND/"><FaGithub /></a>
            </div>


            <ul className="social">
                <p>
                    Le succès c'est tomber sept fois, se relever huit <br />
                    La vie est un mystère qu'il faut vivre, et non un problème à résoudre
                </p>
            </ul>

            <p className="copyright">
                Dev-Pentest@Blog © 2023 - Tous Droits Réservés.
            </p>

        </div >
    )
}

export default Footer