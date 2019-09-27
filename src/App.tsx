import React, { useState } from 'react';
import logo from './logo.svg';
import githubdark from './github.png';
import githublight from './githublight.png';
import { makeStyles, Theme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Link, Paper, FormControlLabel, Switch } from '@material-ui/core';
import { AppTabs } from './AppTabs';
import { darkTheme, lightTheme } from './theme';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    appLogo: {
        animation: '$App-logo-spin infinite 15s linear',
        height: '64px',
    },
    title: {
        flexGrow: 1,
    },
    githublogo: {
        width: 24,
        height: 24,
        marginLeft: theme.spacing(2),
    },
    link: {
        margin: theme.spacing(.5),
    },
    '@keyframes App-logo-spin': {
        'from': {
            transform: 'rotate(0deg)',
        },
        'to': {
            transform: 'rotate(360deg)',
        },
    },
}));

const gitHubUrl = 'https://github.com/sidecus/reactstudy';

export const App = () => {
    const [theme, setTheme] = useState<Theme>(darkTheme);
    const classes = useStyles();


    const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.checked ? darkTheme : lightTheme);
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Paper className={classes.root}>
                <AppBar position='static' color='inherit'>
                    <Toolbar>
                        <img src={logo} className={classes.appLogo} alt="logo" />
                        <Typography variant="h5" className={classes.title}>
                            React Study
                        </Typography>
                        <img src={theme === darkTheme ? githublight : githubdark} alt='githublogo' className={classes.githublogo}/>
                        <Link variant='body2' href={gitHubUrl} color='inherit' target='_blank' className={classes.link}>
                            sidecus
                        </Link>
                        <FormControlLabel
                            control={
                                <Switch checked={theme === darkTheme} onChange={toggleTheme} color='primary'/>
                            }
                            label='Dark Theme'
                        />
                    </Toolbar>
                </AppBar>
                <AppTabs />
            </Paper>
        </MuiThemeProvider>
    );
}
