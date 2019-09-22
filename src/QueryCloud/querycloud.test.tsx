import { scaleSqrt } from 'd3-scale';
import { IWord, getWords } from './wordsplitter';
import { processWords } from './used3words';

it('getWords handles empty array', () => {
    const queries = [] as string[];
    const words = getWords(queries);
    expect(words.length).toEqual(0);
});

it('getWords works correctly', () => {
    const str = '`install~ ;install:= {install}your !exchange+ 2323 domain it is awe_ful a his the have abc this !!!! abc.3 expired ours us help\\install\"\' office? 1.3..5.6 ^#$#%$office#%^&@';
    const queries = [str, str];
    const expected = [
        {text: 'install', value: 8},
        {text: 'exchange', value: 2},
        {text: 'domain', value: 2},
        {text: 'awe_ful', value: 2},
        {text: 'abc', value: 4},
        {text: 'expired', value: 2},
        {text: 'help', value: 2},
        {text: 'office', value: 4},
    ] as IWord[];
    const words = getWords(queries);
    expect(words).toEqual(expected);
});

it('processWords handles empty array', () => {
    const words = [] as IWord[];
    const d3Words = processWords(words, 5, 3, 5);
    expect(d3Words.length).toEqual(0);
});

it('processWords works correctly', () => {
    const second = {text: 'exchange', value: 200};
    const first = {text: 'install', value: 8000};
    const third = {text: 'domain', value: -2};
    const words = [second, first, third];
    const mapSize = scaleSqrt().domain([-2, 8000]).range([10, 100]);

    // expect words are sorted and size mapped based on min/max font size
    const expected = [
        { text: first.text, size: mapSize(first.value)},
        { text: second.text, size: mapSize(second.value)},
        { text: third.text, size: mapSize(third.value)}
    ];
    const d3Words = processWords(words, 5, 10, 100);
    expect(d3Words).toEqual(expected);
});
