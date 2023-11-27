export interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
}

export interface CharacterExtendedCard {
    id: number;
    showExtendedCard: boolean;
}

export interface CharacterExtended {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    },
    location: {
        name: string;
        url: string;
    },
    image: string;
    episode: Array<string>;
    url: string;
}

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Array<string>;
    url: string;
    created: string;
}

export interface APIData {
    allLocations: any;
    allCharacters: any;
    allEpisodes: any;
}

export interface TopListCharacter {
    id: number;
    name: string;
    origin: {
        name: string;
        url: string;
    };
}

export interface Placeholder {
    placeholderCount: number;
}
