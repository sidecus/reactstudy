import { Word as d3Word } from 'd3-cloud';
import cloud from 'd3-cloud';
import { scaleOrdinal, scaleSqrt } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { select, Selection } from 'd3-selection';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

const MIN_WIDTH = 80;
const MIN_HEIGHT = 80;
const MARGIN = 10;

const DEFAULT_WORD_COUNT = 100;
const FONT_FAMILY = 'Impact';
const DEFAULT_MIN_FONT_SIZE = 5;
const DEFAULT_MAX_FONT_SIZE = 50;

// interfaces
export interface IWord {
    text: string;
    value: number;
}

// Punctuation and stop word regex.
// Punctuation character escaping please see: https://www.regular-expressions.info/charclass.html
// Stop word list is limited now.
// tslint:disable-next-line:max-line-length
const urlRegex = /\bhttps?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&amp;//=]*)\b/gi;
const punctuationRegex = /[\\\-\][/^$.|?*+(){}'",#!%&;:=`~@]+/gi;
const stopWordRegex = /\b(?:https|you|your|yours|i|me|my|we|our|ours|us|he|him|his|she|her|hers|they|them|their|it|its|who|whose|which|this|that|the|an|a|is|are|am|was|were|be|being|have|has|will|would|shall|should|when|where|why|what|how|now|if|then|but|and|or|so|to|for|on|of|at|as|about|with|from|in|into|onto|up|by|than|can|let|please|go|do|did|<pii>|(?:\d+))\b/gi;
const delimiterRegEx = new RegExp(`${urlRegex.source}|${punctuationRegex.source}|${stopWordRegex.source}`, 'g');

// Helper method to convert list of strings to IWord list by filtering out punctuations and stop words
export const getWords = (queries: string[]) => {
    // tslint:disable-next-line:no-any
    const dict: any = {};
    queries.filter((x: string) => !!x).forEach((x: string) => {
        const rawWords = x.toLowerCase().replace(delimiterRegEx, ' ').trim().split(/\s+/);
        rawWords.forEach((w: string) => {
            if (dict.hasOwnProperty(w)) {
                dict[w] ++;
            } else {
                dict[w] = 1;
            }
        });
    });

    // Convert to IWords array
    const result = [] as IWord[];
    Object.keys(dict).forEach((w: string) => {
        result.push({text: w, value: dict[w]});
    });

    return result;
};

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

//
// Functions needed by rendering
//
type d3SvgGSelection = Selection<SVGGElement, unknown, null, undefined>;
const getFontSize = (d: d3Word) => d.size + 'px';
const getTransform = (d: d3Word) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`;
const fill = scaleOrdinal(schemeCategory10);
const getFill = (d: d3Word, i: number) => fill(i.toString());
const renderd3Cloud = (tags: d3Word[], d3SvgG: d3SvgGSelection) => {
    // d3 rendering logic
    d3SvgG
        .selectAll('text')
        .data(tags)
        .enter()
        .append('text')
        .style('font-size', getFontSize)
        .attr('text-anchor', 'middle')
        .attr('transform', getTransform)
        .attr('fill', getFill)
        .text((d: d3Word) => d.text!);
};

//
// Word cloud component. Inspired by https://github.com/chrisrzhou/react-wordcloud
//
export interface IQueryCloudProps {
    queries: string[];
    wordCount?: number;
    minFontSize?: number;
    maxFontSize?: number;
}

const defaultProps : IQueryCloudProps = {
    queries: [],
    wordCount: DEFAULT_WORD_COUNT,
    minFontSize: DEFAULT_MIN_FONT_SIZE,
    maxFontSize: DEFAULT_MAX_FONT_SIZE
};

export const QueryCloud = (props: IQueryCloudProps) => {
    const mergedProps = { ...defaultProps, ...props };

    // use React hooks - containerDivRef (dom access), state (info passing between effects) and effect (dom operation for rendering)
    const containerDivRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<[number, number]>([0, 0]);
    const [d3SvgG, setd3SvgG] = useState<d3SvgGSelection>();
    const [words, setWords] = useState<d3Word[]>();

    // Effect to initialize the D3 SVG g selection used to draw the chart.
    // This has no dependency so this will only be run once.
    useEffect(() => {
        const element = containerDivRef.current!;
        const parent = element.parentElement!;
        const width = Math.max(parent.offsetWidth, MIN_WIDTH) - MARGIN * 2;
        const height = Math.max(parent.offsetHeight, MIN_HEIGHT) - MARGIN * 2;

        // Add a svg container and set attributes
        const svgG = select(element)
            .append('svg')
                .style('display', 'block')
                .attr('width', width + MARGIN * 2)
                .attr('height', height + MARGIN * 2)
            .append('g')
                .attr('transform', `translate(${width / 2},${height / 2})`);

        // Update state with the g element selection and size
        setd3SvgG(svgG);
        setSize([width, height]);

        // cleanup callback
        return (): void => {
            select(element).selectAll('*').remove();
        };
    }, []);

    // Effect to compute the words.
    // This will only rerun when some props changes.
    useEffect(() => {
        if (!mergedProps.queries || mergedProps.queries.length <= 1) {
            return;
        }

        // process the words and conver to d3 Words. This will only rerun when queries change.
        const d3Words = processWords(getWords(mergedProps.queries), mergedProps.wordCount!, mergedProps.minFontSize!, mergedProps.maxFontSize!);
        setWords(d3Words);
    }, [mergedProps.queries, mergedProps.wordCount, mergedProps.minFontSize, mergedProps.maxFontSize]);

    // Effect to render the chart after d3 initialization.
    // This will rerun when rendering container changes or words change.
    useEffect(() => {
        if (!words || !d3SvgG || size[0] === 0 || size[1] === 0) {
            return;
        }

        // Layout then render
        cloud()
            .size(size)
            .words(words!)
            .padding(2)
            // .rotate(() => Math.random() * 120 - 60)
            .rotate(0)
            .font(FONT_FAMILY)
            .fontSize((d: d3Word) => d.size!)
            .on('end', (tags: d3Word[]) => renderd3Cloud(tags, d3SvgG))
            .start();
    }, [d3SvgG, size, words]);

    // the container div
    return <div ref={ containerDivRef } />;
};