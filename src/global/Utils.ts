export const getArrayNumberBased = (number: number) => {
    return Array.from({length: number}, (_, index: number) => index + 1);
};
