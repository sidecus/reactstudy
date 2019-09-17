import React from 'react';
import logo from './logo.svg';
import './App.css';
import "react-tabs/style/react-tabs.css";
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { CounterComparison } from './FunctionVSClass/countercomparison';
import { TrumpTweets } from './QueryCloud/trumptweets';
import { HooksSeq } from './HooksEvents/hooksseq';
import { ReduxHooks } from './ReduxHooks/reduxhooks';

const App: React.FC = () => {
  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Tabs className="tabs">
            <TabList>
              <Tab>Function&amp;Class</Tab>
              <Tab>TrumpTweets</Tab>
              <Tab>HooksEvents</Tab>
              <Tab>ReduxHooks</Tab>
            </TabList>
            <div className="tabpanelcontainer">
              <TabPanel className="tabpanel">
                <CounterComparison />
              </TabPanel>
              <TabPanel className="tabpanel">
                <TrumpTweets />
              </TabPanel>
              <TabPanel className="tabpanel">
                <HooksSeq />
              </TabPanel>
              <TabPanel className="tabpanel">
                <ReduxHooks />
              </TabPanel>
            </div>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
