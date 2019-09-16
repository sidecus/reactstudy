import * as React from 'react';
import './counter.css';

// React function component uses hooks providing "counter" capability
const Counter = () => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const title = `Function Component: ${count}`;
        document.title = title;
    }, [count]);

    return (
        <div className="counterdiv">
            <h3>FunctionComponent</h3>
            <h6>You clicked {count} times</h6>
            <button onClick = {() => setCount(count + 1)}>Click me</button>
        </div>
    );
};

export default Counter;