import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 48,
            margin: 0,
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
        <Box
            className={classes.root}
            role="tabpanel"
            hidden={value !== index}
        >
            {children}
        </Box>
    );
}
  
  