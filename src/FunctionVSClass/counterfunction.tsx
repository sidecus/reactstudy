import * as React from 'react';
import { Typography, Button, CardContent } from '@material-ui/core';

// React function component uses hooks providing "counter" capability
export const Counter = () => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (count > 0) {
            document.title = `Function Component: ${count}`;
        }
    }, [count]);

    return (
        <CardContent>
            <Typography variant='h4'>Function Component</Typography>
            <br></br>
            <Typography variant='body1' component='p'>You clicked {count} times</Typography>
            <br></br>
            <Button variant='contained' color='primary' onClick = {() => setCount(count + 1)}>Click me</Button>
        </CardContent>
    );
};