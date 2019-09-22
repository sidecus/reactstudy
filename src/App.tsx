import React from 'react';
import logo from './logo.svg';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Link } from '@material-ui/core';
import { AppTabs } from './AppTabs';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  '@keyframes App-logo-spin': {
    'from': {
      transform: 'rotate(0deg)',
    },
    'to': {
      transform: 'rotate(360deg)',
    },
  },
  appLogo: {
    animation: '$App-logo-spin infinite 20s linear',
    height: '64px',
  },
  link: {
    margin: theme.spacing(2),
  },
}));

const gitHubUrl = 'https://github.com/sidecus/reactstudy';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <img src={logo} className={classes.appLogo} alt="logo" />
          <Typography variant="h6">
            React Study
            <Link href={gitHubUrl} color='inherit' className={classes.link}>sidecus</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <AppTabs />
    </div>
  );
}

export default App;
