export const API_URL = 'https://rickandmortyapi.com/api';
export const ENDPOINTS = {
    characters: '/character',
    locations: '/location',
    episodes: '/episode'
};

export const DEFAULT_CHARACTER = {
    'id': 0,
    'name': '',
    'status': '',
    'species': '',
    'type': '',
    'gender': '',
    'origin': {
        "name": '',
        "url": ''
    },
    'location': {
        'name': '',
        'url': ''
    },
    'image': '',
    'episode': [
        '',
        ''
    ],
    'url': ''
};

export const DEFAULT_PAGE_INFO = {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character/?page=2",
    "prev": null
};
