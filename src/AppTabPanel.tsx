import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 'auto',
            height: '100%',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: 'auto',
            height: '100%',
        },
    }),
);

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export function AppTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <Box className={classes.root} hidden={value !== index}>
            <div className={classes.container}>
                {children}
            </div>
        </Box>
    );
}
  
  