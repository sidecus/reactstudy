import { useEffect, useRef, useState, RefObject } from 'react';

// Customer hook to get a ref element's size.
// This needs special handling since element size can be applied at later stage in React so single one time
// useEffect will not work.
export const useRefSize =
    (minWidth: number = -Infinity, minHeight: number = -Infinity): [RefObject<HTMLDivElement>, [number, number]] => {
    const containerDivRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<[number, number]>([0, 0]);

    // Effect to initialize the D3 SVG g selection used to draw the chart.
    // We are disabling the useEffect missing dependency warning here since we want this to run after each render.
    // eslint-disable-next-line 
    useEffect(() => {
        const element = containerDivRef.current!;
        if (element.offsetWidth > 0 && element.offsetHeight > 0) {
            const width = Math.max(element.offsetWidth, minWidth);
            const height = Math.max(element.offsetHeight, minHeight);
            
            if (width !== size[0] || height !== size[1]) {
                setSize([width, height]);
            }
        }
    });

    return [containerDivRef, size];
}