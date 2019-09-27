import * as React from 'react';
import { Button, Typography, CardContent, WithStyles } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { styles } from './styles';

interface IComponentCounterState {
    count: number;
}

interface IClassCounterProps extends WithStyles<typeof styles, true> {
}

// React function component uses hooks providing "counter" capability
export class ClassCounter extends React.PureComponent<IClassCounterProps, IComponentCounterState> {
    private readonly classes = this.props.classes;

    constructor(props: IClassCounterProps) {
        super(props);
        this.state = {
            count: 0,
        } as IComponentCounterState;
    }

    public render(): JSX.Element {
        return (
            <CardContent className={this.classes.cardcontent}>
                <Typography variant='h4'>Class Component</Typography>
                <Typography variant='subtitle2' color='textSecondary' component='span'>
                    Class component with a counter state.
                </Typography>
                <Typography variant='subtitle2' color='textSecondary' component='span'>
                    It uses React lifecycle events to update window title.
                </Typography>
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

export const ClassCounterWithStyles = withStyles(styles, {withTheme: true})(ClassCounter);
