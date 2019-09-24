import React from 'react';
import { AppBar, Tabs, Tab, Paper, createStyles, makeStyles, Theme } from '@material-ui/core';
import { AppTabPanel } from './AppTabPanel';

import { FunctionVsClass } from './FunctionVSClass/functionvsclass';
import { TrumpTweets } from './QueryCloud/trumptweets';
import { HooksEvents } from './HooksEvents/hooksevents';
import { ReduxHooksContainer } from './ReduxHooks/reduxhookscontainer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
        panel: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
    }),
);

export const AppTabs = () => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    }
  
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label='Function & Class' />
                    <Tab label='Trump Tweets' />
                    <Tab label='Hook Events' />
                    <Tab label='Redux Hooks' />
                </Tabs>
            </AppBar>
            <Paper className={classes.panel}>
                <AppTabPanel value={tabIndex} index={0}>
                    <FunctionVsClass />
                </AppTabPanel>
                <AppTabPanel value={tabIndex} index={1}>
                    <TrumpTweets />
                </AppTabPanel>
                <AppTabPanel value={tabIndex} index={2}>
                    <HooksEvents />
                </AppTabPanel>
                <AppTabPanel value={tabIndex} index={3}>
                    <ReduxHooksContainer />
                </AppTabPanel>
            </Paper>
        </div>
    );
}
