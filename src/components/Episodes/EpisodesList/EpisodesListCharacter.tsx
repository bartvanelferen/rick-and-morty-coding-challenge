import React from "react";

const EpisodesListCharacter: React.FC<{episode: any, locations: any }> = ({
    episode,
    locations
}) => {
    const getDimensionName = (dimensionID: number) => {
        const locationData = locations.find((location: any) => location.id == dimensionID);

        return locationData !== undefined ? locationData.name : 'unknown';
    }

    return (
        <div className="top-episode-wrapper">
            {episode.uniqueDimensions.map((dimension: number) => (
                <div className="top-episode-container">
                    <h5>{getDimensionName(dimension)}</h5>
                    <ul>
                        {episode.characters.filter((character: any) => character.origin.id === dimension).map((filterCharacter: any) => (
                            <li>
                                {filterCharacter.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default EpisodesListCharacter;
