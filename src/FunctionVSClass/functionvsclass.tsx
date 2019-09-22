import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';

import { Counter } from './counterfunction';
import { ComponentCounter } from './counterclass';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            minWidth: 300,
        },
    }),
);

export const FunctionVsClass = () =>
{
    const classes = useStyles();

    return (
        <Grid container direction='column' justify='center' alignItems='center' className={classes.root}>
            <Grid container direction='row' justify='space-around' alignItems='center'>
                <Grid item xs={5}>
                    <Card className={classes.card}>
                        <Counter />
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card className={classes.card}>
                        <ComponentCounter />
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}