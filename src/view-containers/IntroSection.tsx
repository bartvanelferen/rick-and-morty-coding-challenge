import React from 'react';
import '../assets/styles/containers/IntroSection.css';
import Menu from "../components/UI/Menu/Menu";

const IntroSection = () => {
    return (
        <section className="section intro-section">
            <Menu/>
            <h1 className="intro-section__title">The Rick and Morty <br/>Coding Challenge</h1>
        </section>
    );
};

export default IntroSection;