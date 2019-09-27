import * as React from 'react';
import { useState, useRef, useEffect, useCallback, RefObject } from 'react';
import { Typography, Button, CardContent } from '@material-ui/core';
import { useStyles } from './styles';

// React function component uses hooks providing "counter" capability.
// This one demonstrates how to avoid child component rerendering with React.memo and useCallback.
export const ChildRerendering = () => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const rerenderCountRefA = useRef<number>(0);
    const rerenderCountRefB = useRef<number>(0);
    const spanRef = useRef<HTMLSpanElement>(null);

    // Assuming you want to do some manipulation before you do set the state upon button click.
    // You wrap that into a function as below. This can cause unexpected unnecessary rerendering since we have a new instance of this function in each render.
    const embededFunctionClickCallback = () => setCount(count => count + 1);

    // For the same purpose as above, we use useCallback instead. This won't cause unexpected rerender.
    const memoizedClickCallback = useCallback(() => setCount(count => count + 1), [setCount]);

    useEffect(() => {
        spanRef.current!.textContent = `ButtonA rendered ${rerenderCountRefA.current} times; ButtonB rendered ${rerenderCountRefB.current} times`;
    });

    return (
        <CardContent className={classes.cardcontent}>
            <Typography variant='h4'>Function Child Component Rerendering</Typography>
            <Typography variant='subtitle2' color='textSecondary' component='span'>
                ButtonA and ButtonB are childrens of the same parent element.
            </Typography>
            <Typography variant='subtitle2' color='textSecondary' component='span'>
                Both of them will cause parent component to rerender. Click to see the differences.
            </Typography>
            <br></br>
            <Typography variant='h6' component='p'>You clicked {count} times</Typography>
            <div className={classes.rowdiv}>
                <Typography variant='body2' component='span' color='secondary' className={classes.rowelement} ref={spanRef} />
            </div>
            <div className={classes.rowdiv}>
                {/* this button will always rerender when UnnecessaryChildRendering state changes - props change because embededFunctionClickCallback is now a new function instance */}
                <SetCountButton onClick={embededFunctionClickCallback} renderCountRef={rerenderCountRefA} buttonText='ButtonA' className={classes.rowelement} />
                {/* this button will not rerenders when UnnecessaryChildRendering state changes - its props don't change */}
                <SetCountButton onClick={memoizedClickCallback} renderCountRef={rerenderCountRefB} buttonText='ButtonB' className={classes.rowelement}/>
            </div>
        </CardContent>
    );
};

interface ISetCountButtonProps {
    buttonText: string;
    renderCountRef: React.MutableRefObject<number>;
    className: string;
    onClick: () => void;
}

// Runction components are rerendered (called) whenever parent component rerenders - regardless of whether props change or not.
// to avoid unnecessary rerendering when props are the same, we use React.memo.
// React.memo is similar concept as PureComponent, but it's intended for function components.
// https://headway.io/blog/react-optimize-components-memo-usememo-usecallback/
const SetCountButtonFunctionComponent = (props: ISetCountButtonProps) => {
    const classes = useStyles();

    useEffect(() => {
        props.renderCountRef.current = props.renderCountRef.current + 1;
    });

    return (
        <Button variant='contained' onClick={props.onClick} color='primary' className={classes.rowelement}>{props.buttonText}</Button>
    );
}

// This is how we wrap the function component into React.memo. React will make sure the component is not rerendered 
const SetCountButton = React.memo(SetCountButtonFunctionComponent);