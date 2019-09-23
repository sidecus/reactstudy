import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';

import { Counter } from './counterfunction';
import { ComponentCounter } from './counterclass';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            flexWrap: 'wrap',
        },
        card: {
            width: '25vw',
            minWidth: '300',
            Height: 400,
        },
    }),
);

export const FunctionVsClass = () => {
    const classes = useStyles();

    return (
        <Grid container direction='row' justify='space-around' alignItems='center' className={classes.root}>
            <Grid item>
                <Card className={classes.card}>
                    <Counter />
                </Card>
            </Grid>
            <Grid item>
                <Card className={classes.card}>
                    <ComponentCounter />
                </Card>
            </Grid>
        </Grid>
    );
}