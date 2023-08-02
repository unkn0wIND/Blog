import React, { useState } from 'react';
import Modal from './Modal';

const About = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='about-container'>
            <div className='about' data-aos="zoom-in" data-aos-duration="1000" data-aos-once="false">
                <h1 data-aos="fade-down" data-aos-duration="1500">BIENVENUE 👨‍🚀</h1>
                <p data-aos="zoom-in">
                    Ces articles sur la sécurité informatique sont à titre éducatif et préventif UNIQUEMENT !<br />
                    Ni l’auteur ni son hébergeur ne pourront être tenus responsables de vos agissements frauduleux<br /><br />
                </p>
                <button className='rainbow' onClick={handleOpenModal}>POURQUOI CE BLOG ? 👾</button>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <p>
                        Tout d'abord je suis un passionné de la sécurité informatique 🤠<br />
                        Ensuite ce projet m'a permis d'apprendre le côté FULLSTACK d'une application REACT 🚀<br />
                        C'est une application de blog réalisé avec ViteJs pour le front-end et Express/NodeJS pour le back-end 💻 <br />
                        Il utilise une architecture SaSS pour le style et Mongodb pour la gestion des articles 📃 <br /><br />
                        Bonne visite 👋
                    </p>
                </Modal>
            </div>
        </div>
    )
}

export default About