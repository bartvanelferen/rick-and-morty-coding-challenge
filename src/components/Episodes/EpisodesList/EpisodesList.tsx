import React, {useEffect, useState} from 'react';
import {API_URL, ENDPOINTS} from '../../../global/Constants';
import axios from 'axios';
import '../../../assets/styles/components/EpisodesList.css';
import '../../../assets/styles/components/Button.css';
import {getArrayNumberBased} from "../../../global/Utils";
import EpisodesListCharacter from "./EpisodesListCharacter";
import {APIData} from "../../../global/Interfaces";

const EpisodesList = () => {
    // Get all IDs based on fixed number that is known and ascending, ideally must be more dynamic.
    const allLocationIDs = getArrayNumberBased(126);
    const allCharactersIDs = getArrayNumberBased(826);
    const allEpisodesIDs = getArrayNumberBased(51);

    const [allData, setAllData] = useState<APIData | null>(null);

    const fetchAllData = async (): Promise<void> => {
        try {
            const responseLocations= await axios.get(`${API_URL}${ENDPOINTS.locations}/${allLocationIDs.join(',')}`);
            const allLocations = responseLocations.data;

            const responseCharacters= await axios.get(`${API_URL}${ENDPOINTS.characters}/${allCharactersIDs.join(',')}`);
            const allCharacters = responseCharacters.data;

            const responseEpisodes= await axios.get(`${API_URL}${ENDPOINTS.episodes}/${allEpisodesIDs.join(',')}`);
            const allEpisodes = responseEpisodes.data;

            // Set the data in the state
            setAllData({
                allLocations,
                allCharacters,
                allEpisodes,
            });
        } catch (error) {
            console.error('Error', error);
        }
    };

    useEffect(() => {
        void fetchAllData();
    }, [allData === null]);

    const getEpisodesCharacters = (episode: any) => {
        const allCharacters = allData?.allCharacters;
        let updatedCharacters: any = [];

        episode.characters.forEach((character: string) => {
            const characterID: string = character.split('/character/')[1];
            const characterData = allCharacters.find((characterDetailed: any) => characterDetailed.id === Number(characterID));
            const originID = characterData.origin.url.split('/location/')[1] !== undefined ? Number(characterData.origin.url.split('/location/')[1]) : 0;

            updatedCharacters.push({
                origin: {
                    name: characterData.origin.name,
                    id: originID
                },
                name: characterData.name,
                id: Number(characterID),
            });
        });

        return updatedCharacters;
    };

    const getUniqueDimensions = (characters: any) => {
        return [...Array.from(new Set(characters.map((dimension: any) => dimension.origin.id)))];
    };

    const getAllUpdatedEpisodes = () => {
        const allEpisodes = allData?.allEpisodes;
        let updatedEpisodes: any = [];

        allEpisodes?.map((episode: any) => {
            const episodeCharacters = getEpisodesCharacters(episode);
            const uniqueDimensions = getUniqueDimensions(episodeCharacters);

            updatedEpisodes.push({
                ...episode,
                characters: episodeCharacters,
                uniqueDimensions: uniqueDimensions
            })
        });

        return updatedEpisodes;
    };

    const sortedEpisodes = () => {
        const allUpdatedEpisodes = getAllUpdatedEpisodes();

        return allUpdatedEpisodes.sort(
            (a: any, b: any) => b.uniqueDimensions.length - a.uniqueDimensions.length
        );
    }

    return (
        <div>
            <h1>Top 10 Episodes with Highest Count of Unique Characters' Origin Dimensions</h1>
            <>
                {sortedEpisodes().slice(0, 10).map((episode: any, index: number) => (
                    <div className="top-episode">
                        <h3 className="top-episode-title">{`${index + 1}. ${episode.name}`} <i>Unique origin dimensions: {episode.uniqueDimensions.length}</i></h3>
                        <EpisodesListCharacter
                            key={index}
                            episode={episode}
                            locations={allData?.allLocations}
                        />
                    </div>
                ))}
            </>
        </div>
    );
};

export default EpisodesList;
