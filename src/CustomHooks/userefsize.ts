import { useEffect, useRef, useState, RefObject } from 'react';

// Customer hook to get a ref element's size.
// This needs special handling since element size can be applied at later stage in React so single one time
// useEffect will not work - it needs to run after each dom update.
// This is by itself a cheap operation - however we have to do size comparison to avoid unnecessary rerendering caused by this.
export const useRefSize = (): [RefObject<HTMLDivElement>, [number, number]] => {
    const parentDivRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<[number, number]>([0, 0]);

    // Effect to get the ref div size, and set state when it's no longer zero.
    // We are disabling the useEffect missing dependency warning here since we want this to run after each render.
    // eslint-disable-next-line 
    useEffect(() => {
        const parentDiv = parentDivRef.current!;
        const width = parentDiv.offsetWidth;
        const height = parentDiv.offsetHeight;
        
        // since size's initial value is [0,0], this comparison gaurantees that we only do this when size is valid.
        if (width !== size[0] || height !== size[1]) {
            setSize([width, height]);
        }
    });

    return [parentDivRef, size];
}