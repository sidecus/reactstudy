import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Theme, createStyles, makeStyles, Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        griditem: {
            height: '80vh',
        },
        card: {
            height: '80vh',
        },
        cardcontent: {
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logarea: {
            minHeight: '60vh',
            minWidth: '50vw',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            border: 'none',
        },
    }),
);

const getTimedMessage = (message: string) => {
    const now = new Date();
    return `${now.toISOString()} - ${message}\n`;
}

const queueMessage = (messageBufferRef: React.MutableRefObject<string>, value: number, message:string) => {
    const currentValue = messageBufferRef.current;
    messageBufferRef.current = currentValue + getTimedMessage(`[${value}] ${message}`);
}

const showMessages = (textArea: HTMLTextAreaElement, messages: string) => {
    textArea.value = messages;
    textArea.scrollTop = textArea.scrollHeight;
}

const useLoggingEffect = (
    name: string,
    value: number,
    textAreaRef: React.RefObject<HTMLTextAreaElement>,
    messageBufferRef: React.MutableRefObject<string>,
    shouldRun: boolean,
    deps?: readonly any[]
): void => {
    // Use effect hooks to change the text area dom element directly.
    // We cannot use state to do this - it'll cause infinite rendering.
    useEffect(() => {
        if (shouldRun) {
            queueMessage(messageBufferRef, value, `${name} running`);
            showMessages(textAreaRef.current!, messageBufferRef.current);

            return () => {
                queueMessage(messageBufferRef, value, `${name} cleanup`);
            }
        }
    },
    // Use the given dependency list (blindly). eslint gives warning so we mute it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps);
}

const useOneTimeEffect = (value: number, textAreaRef: React.RefObject<HTMLTextAreaElement>, messageBufferRef: React.MutableRefObject<string>): void => {
    // No dependency list
    useLoggingEffect('OneTimeEffect', value, textAreaRef, messageBufferRef, true, []);
}

const useConstantEffect = (value: number, textAreaRef: React.RefObject<HTMLTextAreaElement>, messageBufferRef: React.MutableRefObject<string>): void => {
    // Depending on value so will rerender whenever value updates
    useLoggingEffect('ConstantEffect', value, textAreaRef, messageBufferRef, true, [value]);
}

const useRandomEffect = (value: number, textAreaRef: React.RefObject<HTMLTextAreaElement>, messageBufferRef: React.MutableRefObject<string>):void => {
    // Depending on value so will rerender whenever value updates.
    // However, the effect only takes place randomly
    useLoggingEffect('RandomEffect', value, textAreaRef, messageBufferRef, Math.random() > 0.5, [value]);
}

// function component
export const HooksSeq = () => {
    // state to hold value which is used to trigger rerender
    const [value, setValue] = useState(0);
    // we use a string array ref as a in memory cache to hold messages to show
    const messageBufferRef = useRef<string>('');
    // use mutable object ref to hold messages. We cannot put this into state.
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useOneTimeEffect(value, textAreaRef, messageBufferRef);
    useConstantEffect(value, textAreaRef, messageBufferRef);
    useRandomEffect(value, textAreaRef, messageBufferRef);

    queueMessage(messageBufferRef, value, "rendering");

    const classes = useStyles();

    return (
        <Grid container direction='column' justify='flex-start' alignItems='center'>
            <Grid item xs={10} className={classes.griditem}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardcontent}>
                        <Typography variant='h4'>Hooks events</Typography>
                        <Typography variant='h6' className={classes.logarea} component='textarea' ref={textAreaRef}></Typography>
                        <br></br>
                        <Button variant='contained' color='primary' onClick={() => setValue(value + 1)}>Rerender</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};