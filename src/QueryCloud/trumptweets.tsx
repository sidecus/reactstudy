import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { QueryCloud } from './querycloud';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

export const numberOfTweets = 800;
export const maxFontSize = 80;
export const wordCount = 80;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
        card: {
            height: '100%',
            width: '80vw',
            display: 'flex',
        },
        cardcontent: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
        },
    }),
);

export const TrumpTweets = () => {
    const classes = useStyles();  
    const [queries, setQueries] = useState<string[]>([]);

    useEffect(() => {
        const getTrumpTweets = async () => {
            const trumpTweets = [] as string[];
            // data from http://trumptwitterarchive.com/
            const url = 'http://d5nxcu7vtzvay.cloudfront.net/data/realdonaldtrump/2018.json';
            const response = await fetch(url);
            const tweets = await response.json();
            tweets.slice(0, numberOfTweets).map((t: any) => trumpTweets.push(t.text.replace('&amp;', '&')));

            setQueries(trumpTweets);
        };

        getTrumpTweets();
    
    }, []);

    return (
        <Grid container direction='column' justify='center' alignItems='center' className={classes.rootGrid}>
            <Grid item xs={10}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardcontent}>
                        <Typography variant='h4'>Trump 2018 last {numberOfTweets} tweets</Typography>
                        <QueryCloud queries={queries} wordCount={wordCount} maxFontSize={maxFontSize}/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};