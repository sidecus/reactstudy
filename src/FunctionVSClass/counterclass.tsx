import * as React from 'react';
import { Button, Typography, CardContent } from '@material-ui/core';

interface IComponentCounterState {
    count: number;
}

// React function component uses hooks providing "counter" capability
export class ComponentCounter extends React.PureComponent<{}, IComponentCounterState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            count: 0,
        } as IComponentCounterState;
    }

    public render(): JSX.Element {
        return (
            <CardContent>
                <Typography variant='h4'>Class Component</Typography>
                <br></br>
                <Typography variant='body1' component='p'>You clicked {this.state.count} times</Typography>
                <br></br>
                <Button variant='contained' color='primary' onClick = {() => this.setCount(this.state.count + 1)}>Click me</Button>
            </CardContent>
        );
    }

    public componentDidUpdate(): void {
        this.updateTitle();
    }

    public componentDidMount(): void {
        this.updateTitle();
    }

    private setCount = (count: number) => {
        this.setState({
            ...this.state,
            count: count,
        });
    }

    // This kind of DOM operation have to be repeated in both cDU and cDM
    private updateTitle = () => {
        if (this.state.count > 0) {
            document.title = `Class Component: ${this.state.count}`;
        }
    }
}
