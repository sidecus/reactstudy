import * as React from 'react';
import { useEffect, useState } from 'react';
import cloud from 'd3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { select, Selection } from 'd3-selection';
import { d3Word, useD3Words } from './used3words';
import { useRefSize } from '../CustomHooks/userefsize';

const MIN_WIDTH = 80;
const MIN_HEIGHT = 80;

const DEFAULT_WORD_COUNT = 100;
const FONT_FAMILY = 'Impact';
const DEFAULT_MIN_FONT_SIZE = 5;
const DEFAULT_MAX_FONT_SIZE = 50;

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

const defaultProps : Partial<IQueryCloudProps> = {
    wordCount: DEFAULT_WORD_COUNT,
    minFontSize: DEFAULT_MIN_FONT_SIZE,
    maxFontSize: DEFAULT_MAX_FONT_SIZE
};

export const QueryCloud = (props: IQueryCloudProps) => {
    const mergedProps = { ...defaultProps, ...props };

    // use React hooks - ref (dom access), state (info passing between effects) and effect (dom operation for rendering)
    const [containerDivRef, size] = useRefSize(MIN_WIDTH, MIN_HEIGHT);
    const [d3SvgG, setd3SvgG] = useState<d3SvgGSelection>();
    const [d3Words] = useD3Words(mergedProps.queries, mergedProps.wordCount!, mergedProps.minFontSize!, mergedProps.maxFontSize!);

    // Effect to initialize the D3 SVG g selection used to draw the chart.
    // This has no dependency so this will only be run once.
    useEffect(() => {
        const element = containerDivRef.current;
        const width = size[0];
        const height = size[1];

        // Only create element when we have a drawing area
        if (width > 0 && height > 0) {
            // Add a svg container and set attributes
            const svgG = select(element)
                .append('svg')
                    .style('display', 'block')
                    .attr('width', width)
                    .attr('height', height)
                .append('g')
                    .attr('transform', `translate(${width / 2},${height / 2})`);

            // Update state with the g element selection and size
            setd3SvgG(svgG);

            // cleanup callback
            return (): void => {
                select(element).selectAll('*').remove();
            };
        }
    },
    [containerDivRef, size]);

    // Effect to render the chart after d3 initialization.
    // This will rerun when rendering container changes or words change.
    useEffect(() => {
        if (!d3Words || !d3SvgG || size[0] === 0 || size[1] === 0) {
            return;
        }

        // Layout then render
        cloud()
            .size(size)
            .words(d3Words)
            .padding(2)
            // .rotate(() => Math.random() * 120 - 60)
            .rotate(0)
            .font(FONT_FAMILY)
            .fontSize((d: d3Word) => d.size!)
            .on('end', (tags: d3Word[]) => renderd3Cloud(tags, d3SvgG))
            .start();
    },
    [d3SvgG, size, d3Words]);

    // the container div
    return <div id='testdiv' ref={containerDivRef} style={{width:'100%', height:'100%'}}/>;
};