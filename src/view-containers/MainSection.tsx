import React from 'react';
import '../assets/styles/containers/MainSection.css';
import CharacterList from "../components/Charaters/CharacterList/CharacterList";
import EpisodesList from "../components/Episodes/EpisodesList/EpisodesList";

const MainSection = () => {
    return (
        <section className="section main-section">
            <CharacterList/>
            <EpisodesList/>
        </section>
    );
};

export default MainSection;