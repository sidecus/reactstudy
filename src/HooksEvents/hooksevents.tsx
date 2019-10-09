import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Theme, createStyles, makeStyles, Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
        logarea: {
            minHeight: '60vh',
            minWidth: '50vw',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            border: 'none',
            flexGrow: 1,
        },
    }),
);

const getTimedMessage = (message: string) => {
    const now = new Date();
    return `${now.toISOString()} - ${message}\n`;
}

const showEvents = (textAreaRef: React.RefObject<HTMLTextAreaElement>, messageBufferRef: React.MutableRefObject<string>, message: string) => {
    // queue message onto the message buffer
    const currentValue = messageBufferRef.current;
    messageBufferRef.current = currentValue + getTimedMessage(message);
    
    // Render of text area is already set
    const textArea = textAreaRef.current;
    if (textArea) {
        textArea.value = messageBufferRef.current;
        textArea.scrollTop = textArea.scrollHeight;
    }
}

const useLoggingEffect = (
    name: string,
    value: number,
    textAreaRef: React.RefObject<HTMLTextAreaElement>,
    messageBufferRef: React.MutableRefObject<string>,
    deps?: readonly any[]
): void => {
    // Use effect hooks to change the text area dom element directly.
    // We cannot use state to do this - it'll cause infinite rendering.
    useEffect(() => {
        showEvents(textAreaRef, messageBufferRef, `${name} running`);

        return () => {
            showEvents(textAreaRef, messageBufferRef, `${name} cleanup`);
        }
    },
    // Use the given dependency list (blindly). eslint gives warning so we mute it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps);
}

const useEffectEvents = (value: number): [React.RefObject<HTMLTextAreaElement>, React.MutableRefObject<string>] => {
    // we use a string ref (MutableObjectRef) as a in memory cache to hold messages to show. We cannot put this into state.
    const messageBufferRef = useRef<string>('');
    // use DOM RefObject for direct DOM rendering.
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // No dependency list
    useLoggingEffect('OneTimeEffect', value, textAreaRef, messageBufferRef, []);

    // Depending on value so will rerender whenever value updates
    useLoggingEffect('ConstantEffect', value, textAreaRef, messageBufferRef, [value]);

    return [textAreaRef, messageBufferRef];
}

// function component
export const HooksEvents = () => {
    // state to hold value which is used to trigger rerender
    const [value, setValue] = useState(0);
    // refs for event message caching and rendering
    const [textAreaRef, messageBufferRef] = useEffectEvents(value);
    const classes = useStyles();

    showEvents(textAreaRef, messageBufferRef, 'component rerender');

    return (
        <Grid container className={classes.root}>
            <Grid item xs={10}>
                <Card>
                    <CardContent>
                        <Typography variant='h4'>Effect hooks events</Typography>
                        <Typography variant='subtitle1'>Click "rerender" below or "change theme" from app bar and watch events.</Typography>
                        <Button variant='contained' color='primary' onClick={() => setValue(value => value + 1)}>Rerender</Button>
                        <br></br>
                        <Typography variant='body2' className={classes.logarea} component='textarea' ref={textAreaRef}></Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};