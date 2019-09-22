import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
  
export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            className={classes.root}
            {...other}
            >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}
  
  