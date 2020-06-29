import React from 'react';
import { AppBar, Tabs, Tab, Paper, createStyles, makeStyles, Theme } from '@material-ui/core';
import { AppTabPanel } from './AppTabPanel';

import { FunctionVsClass } from './FunctionVSClass/functionvsclass';
import { TrumpTweets } from './QueryCloud/trumptweets';
import { HooksEvents } from './HooksEvents/hooksevents';
import { ReduxHooksContainer } from './ReduxHooks/reduxhookscontainer';
import { RenderPropHooks } from './RenderPropHooks/RenderPropHooks';

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

const TabsArray = [
    { label: 'Function & Class', content: <FunctionVsClass />},
    { label: 'Trump Tweets', content: <TrumpTweets />},
    { label: 'Hook Events', content: <HooksEvents />},
    { label: 'ReduxHooks TodoApp', content: <ReduxHooksContainer />},
    { label: 'RenderProp And Hooks', content: <RenderPropHooks />},
];

export const AppTabs = () => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(0);
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTabIndex(newValue);
    }
  
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={activeTabIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {TabsArray.map((t, i) => <Tab label={t.label} key={i}/>)}
                </Tabs>
            </AppBar>
            <Paper className={classes.panel}>
                {TabsArray.map((t, i) => <AppTabPanel value={activeTabIndex} key={i} index={i}>{t.content}</AppTabPanel>)}
            </Paper>
        </div>
    );
}
