import React, {useState} from 'react';
import { Character } from "../../../global/Interfaces";
import '../../../assets/styles/components/CharacterCard.css';
import CharacterCardExtended from "./CharacterCardExtended";

const CharacterCard = ({
    id,
    name,
    image,
    status
}: Character) => {
    const [showExtendedCard, setShowExtendedCard] = useState(false);

    return (
        <>
            <article className="character" onClick={() => setShowExtendedCard(!showExtendedCard)}>
                <div className="character__image-wrapper">
                    <img alt={name} src={image}/>
                </div>
                <div className="character__content-wrapper">
                    <h2>{name}</h2>
                    <p className="character__status">
                        <span className={status.toLowerCase()}></span>
                        {status}
                    </p>
                </div>
            </article>
            {showExtendedCard ? (
                <div className="character__pop-up-wrapper">
                    <div className="character__pop-up-container">
                        <span className="character__pop-up-close" title="Close" onClick={() => setShowExtendedCard(false)}>X</span>
                        <CharacterCardExtended
                            id={id}
                            showExtendedCard={showExtendedCard}
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default CharacterCard;
