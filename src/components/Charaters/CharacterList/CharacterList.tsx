import React, { useState, useEffect } from 'react';
import {API_URL, DEFAULT_PAGE_INFO, ENDPOINTS} from '../../../global/Constants';
import {Character} from '../../../global/Interfaces';
import axios from 'axios';
import CharacterCard from "../CharacterCard/CharacterCard";
import CharacterListPlaceholders from "./CharacterListPlaceholders";
import '../../../assets/styles/components/CharacterList.css';

export interface PageInfo {
    count: number;
    pages: number;
    next: string | null
    prev: string | null
}

const CharacterList = () => {
    let filterTimeout: NodeJS.Timeout;
    const defaultCount: number = 6;
    const noResults: string = 'No results, try another search';
    const introSection = document.querySelector<HTMLElement>('.intro-section__title');

    const [filterName, setFilterName] = useState('');
    const [characters, setCharacters] = useState<Character[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>(DEFAULT_PAGE_INFO);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const scrollToTop = (top: number) => {
        window.scrollTo({ top: top, behavior: 'smooth' });
    };

    const searchHandler = (query: string) => {
        clearTimeout(filterTimeout)
        if (!query) {
            setCurrentPage(1);
            return setFilterName('');
        }

        filterTimeout = setTimeout((): void => {
            setFilterName(query.toLowerCase());
            setCurrentPage(1);
        }, 500);
    };

    const pageHandler = (direction: string) => {
        if (direction === 'prev') {
            setCurrentPage(currentPage - 1);
            if (introSection instanceof HTMLElement) {
                scrollToTop(introSection.offsetHeight);
            }
        } else if (direction === 'next') {
            setCurrentPage(currentPage + 1);
            if (introSection instanceof HTMLElement) {
                scrollToTop(introSection.offsetHeight);
            }
        }
    }

    const fetchCharacterData = async (): Promise<void> => {
        try {
            setError(false);
            const response = await axios.get(`${API_URL}${ENDPOINTS.characters}?name=${filterName}&page=${currentPage}`);
            setCharacters(response.data.results);
            setPageInfo(response.data.info);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    useEffect((): void => {
        setLoading(true);
        // Wrap with timeout because API is too fast, so user experience may be impacted
        setTimeout((): void => {
            void fetchCharacterData();
        }, 1000);
    }, [filterName, currentPage]);

    return (
        <div className="characters-list-container">
            <div className="characters-list__search-wrapper">
                <input
                    className="characters-list__search-input"
                    type="search"
                    placeholder="Search a character"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => searchHandler(event.target.value)}
                />
            </div>
            {!error ? (
                <div className="characters-list">
                    {loading ? (
                        <CharacterListPlaceholders
                            placeholderCount={defaultCount}
                        />
                    ) : (
                        <>
                            {characters.map((character: Character) => (
                                <CharacterCard
                                    key={character.id}
                                    id={character.id}
                                    name={character.name}
                                    image={character.image}
                                    status={character.status}
                                />
                            ))}
                        </>
                    )}
                </div>
            ) : (
                <p>{noResults}</p>
            )}
            <div className="characters-list__navigation">
                <span>{`${currentPage} / ${pageInfo.pages}`}</span>
                <div>
                    <button
                        className="navigation-button"
                        disabled={currentPage === 1}
                        onClick={() => pageHandler('prev')}
                    >
                        Previous Page
                    </button>
                    <button
                        className="navigation-button"
                        disabled={currentPage === pageInfo.pages}
                        onClick={() => pageHandler('next')}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharacterList;
