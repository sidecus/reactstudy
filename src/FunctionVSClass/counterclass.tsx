import * as React from 'react';
import './counter.css';

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
            <div className="counterdiv">
                <h3>ClassComponent</h3>
                <h6>You clicked {this.state.count} times</h6>
                <button onClick = {() => this.setCount(this.state.count + 1)}>Click me</button>
            </div>
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
        document.title = `Class Component: ${this.state.count}`;
    }
}
