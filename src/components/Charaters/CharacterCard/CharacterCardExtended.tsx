import React, {useEffect, useState} from 'react';
import '../../../assets/styles/components/CharacterCard.css'
import axios from "axios";
import {API_URL, DEFAULT_CHARACTER, ENDPOINTS} from "../../../global/Constants";
import {CharacterExtendedCard, CharacterExtended, Episode} from '../../../global/Interfaces';

const CharacterCardExtended = ({
    id,
    showExtendedCard
}: CharacterExtendedCard) => {
    const totalEpisodes: number = 51;

    const [characterData, setCharacterData] = useState<CharacterExtended>(DEFAULT_CHARACTER);
    const [episodeData, setEpisodeData] = useState<Episode[]>([]);
    const [episodes, setEpisodes] = useState<Array<string>>([]);

    const getEpisodeIDs = (urls: Array<string>) => {
        return urls.map(url => {
            return url.split('/episode/')[1];
        });
    };

    const fetchCharacterData = async (): Promise<void> => {
        try {
            const response = await axios.get(`${API_URL}${ENDPOINTS.characters}/${id}`);
            setCharacterData(response.data);
            setEpisodes(getEpisodeIDs(response.data.episode));
        } catch (error) {
            console.log('Error', error);
        }
    };

    const fetchEpisodeData = async () => {
        try {
            const response = await axios.get(`${API_URL}${ENDPOINTS.episodes}/${episodes.join(',')}`);
            setEpisodeData(Array.isArray(response.data) ? response.data : [response.data]);
        } catch (error) {
            console.log('Error', error);
        }
    };

    useEffect((): void => {
        void fetchCharacterData();
    }, [showExtendedCard]);

    useEffect((): void => {
        void fetchEpisodeData();
    }, [episodes]);

    return (
        <div className="character character-extended">
            <div className="character__image-wrapper">
                <img alt={characterData.name} src={characterData.image}/>
                <div className="character__basic-content">
                    <h2>{characterData.name}</h2>
                    <p className="character__status">
                        <span className={characterData.status.toLowerCase()}></span>
                        {`${characterData.status} - ${characterData.species}`}
                    </p>
                    <p className="character__basic-content-section">
                        <span>Location</span>
                        {characterData.location.name}
                    </p>
                    <p className="character__basic-content-section">
                        <span>Gender</span>
                        {characterData.gender}
                    </p>
                </div>
            </div>
            <div className="character__content-wrapper">
                {episodeData.length > 0 ? (
                    <>
                        <h3>{`Episodes (${episodeData.length} / ${totalEpisodes}):`}</h3>
                        <ul className="character__content-episodes">
                            {episodeData.map((episode: Episode, index: number) => (
                                <li key={index}>{episode.name}</li>
                            ))}
                        </ul>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default CharacterCardExtended;
