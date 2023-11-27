import React from 'react';
import '../../../assets/styles/components/CharacterCard.css';
import {Placeholder} from '../../../global/Interfaces';

const CharacterListPlaceholders = ({
    placeholderCount
}: Placeholder) => {
    return (
        <>
            {Array.from(Array(placeholderCount)).map((placeholder, index: number) => (
                <article key={index} className="character placeholder">{placeholder}</article>
            ))}
        </>
    );
};

export default CharacterListPlaceholders;
