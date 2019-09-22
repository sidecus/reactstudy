import React, { useState } from 'react';
import logo from './logo.svg';
import { makeStyles, Theme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Link, Paper, Checkbox, FormControlLabel } from '@material-ui/core';
import { AppTabs } from './AppTabs';
import { darkTheme, lightTheme } from './theme';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        flexGrow: 1,
    },
    appLogo: {
        animation: '$App-logo-spin infinite 20s linear',
        height: '64px',
    },
    link: {
        margin: theme.spacing(2),
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
                        <Typography variant="h6" className={classes.title}>
                            React Study
                            <Link href={gitHubUrl} color='inherit' className={classes.link}>sidecus</Link>
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox checked={theme === darkTheme} onChange={toggleTheme} color='secondary'/>
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
