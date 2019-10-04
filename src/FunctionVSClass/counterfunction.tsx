import * as React from 'react';
import { Typography, Button, CardContent } from '@material-ui/core';
import { useStyles } from './styles';

// React function component uses hooks providing "counter" capability.
// Compare this with counterclass.tsx.
export const FunctionCounter = () => {
    const classes = useStyles();
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (count > 0) {
            document.title = `Function Component: ${count}`;
        }
    }, [count]);

    return (
        <CardContent className={classes.cardcontent}>
            <Typography variant='h4'>Function Component</Typography>
            <Typography variant='subtitle2' color='textSecondary' component='span'>
                Function component with a counter state.
            </Typography>
            <Typography variant='subtitle2' color='textSecondary' component='span'>
                It uses useEffect hooks to update window title.
            </Typography>
            <br></br>
            <Typography variant='body1' component='p'>You clicked {count} times</Typography>
            <br></br>
            {/* Note how we are updating the state. We use an updater function instead of using a closure. This can help avoid bugs*/}
            <Button variant='contained' color='primary' onClick = {() => setCount(count => count + 1)}>Click me</Button>
        </CardContent>
    );
};