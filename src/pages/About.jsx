import React, { useState } from 'react';

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
            </div>
        </div>
    )
}

export default About
