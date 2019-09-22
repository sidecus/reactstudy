import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel } from './TabPanel/tabpanel';

import { FunctionVsClass } from './FunctionVSClass/functionvsclass';
import { TrumpTweets } from './QueryCloud/trumptweets';
import { HooksSeq } from './HooksEvents/hooksseq';
import { ReduxHooksContainer } from './ReduxHooks/reduxhookscontainer';

export const AppTabs = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }
  
    return (
        <>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
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
            <TabPanel value={value} index={0}>
                <FunctionVsClass />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TrumpTweets />
            </TabPanel>
                <TabPanel value={value} index={2}>
            <HooksSeq />
                </TabPanel>
            <TabPanel value={value} index={3}>
                <ReduxHooksContainer />
            </TabPanel>
        </>
    );
}