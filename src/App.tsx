import React from 'react';
import logo from './logo.svg';
import './App.css';
import "react-tabs/style/react-tabs.css";
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { CounterComparison } from './FunctionVSClass/countercomparison';
import { TrumpTweets } from './WordCloud/trumptweets';
import { HooksSeq } from './Hooks/hooksseq';

const App: React.FC = () => {
  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Tabs className="tabs">
            <TabList>
              <Tab>Function&amp;Class</Tab>
              <Tab>TrumpTweets</Tab>
              <Tab>Hooks.All.In.One</Tab>
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
            </div>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
