import { Word } from 'd3-cloud';
import { IWord, getWords } from './wordsplitter';
import { scaleSqrt } from "d3-scale";
import { useMemo } from 'react';

// Process words array, sort and take top element, and convert to d3 Words
export const processWords = (words: IWord[], wordCount: number, minFontSize: number, maxFontSize: number) => {
    const sortedWords = words.sort((a: IWord, b: IWord) => b.value - a.value).slice(0, wordCount);
    const size = sortedWords.length;
    const minValue = size > 0 ? sortedWords[size - 1].value : 1;
    const maxValue = size > 0 ? sortedWords[0].value : 1;

    // map min value and max value to the min/max font size
    const getSize = scaleSqrt().domain([minValue, maxValue]).range([minFontSize, maxFontSize]);
    return sortedWords.map<d3Word>((w: IWord) => {
        return { text: w.text, size: getSize(w.value) } as d3Word;
    });
};

export type d3Word = Word;
export const useD3Words = (queries: string[], wordCount: number, minFontSize: number, maxFontSize: number) => {
    // Use useMemo hooks to avoid recomputing the words during each render.
    // Split queries and get words from the queries
    const words = useMemo(() => {
        return getWords(queries);
    }, [queries]);

    // Get d3words used for rendering purpose
    const d3Words = useMemo(() => {
        return processWords(words, wordCount, minFontSize, maxFontSize);
    },
    [words, wordCount, minFontSize, maxFontSize]);

    return [d3Words];
}