import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import { FunctionCounter } from './counterfunction';
import { ClassCounterWithStyles } from './counterclass';
import { ChildRerendering } from './childrendering';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        card: {
            margin: 48,
            width: '30vw',
            minWidth: '300',
        },
        bigcard: {
            margin: 48,
            width: '50vw',
            minWidth: '300',
        },
    }),
);

export const FunctionVsClass = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <ClassCounterWithStyles />
            </Card>
            <Card className={classes.card}>
                <FunctionCounter />
            </Card>
            <Card className={classes.bigcard}>
                <ChildRerendering />
            </Card>
        </div>
    );
}