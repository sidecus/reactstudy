import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        card: {
            margin: 48,
            width: '70vw',
            minWidth: '300',
        },
        cardcontent: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }),
);

const Context = React.createContext(0);

// Component to add context by a number, using context Hook directly
const TitleWithUseContext = ({toAdd}: {toAdd: number}) => {
    const context = React.useContext(Context);
    console.log('TitleWithUseContext rendering');
    return (
        <Typography color="secondary">context + {toAdd} = {context + toAdd}</Typography>
    );
};

// Component which wraps context add behavior and use render prop to render
const AddNumberToContext = ({toAdd, children} : {toAdd: number, children: (result: number) => JSX.Element}) => {
    const context = React.useContext(Context);
    console.log('AddNumberToContext rendering');
    return children(context + toAdd);
};

// Function to add context by a number, using AddNumberToContext plus render prop
const titleWithRenderProp = (toAdd: number) => {
    console.log('titleWithRenderProp function called');
    return (
        <AddNumberToContext toAdd={toAdd}>
            {(sum) => <Typography color="secondary">context + {toAdd} = {sum}</Typography>}
        </AddNumberToContext>
    );
}

// Component to add context by a number, using a AddNumberToContext plus a render prop instead
const TitleWithRenderProp = ({toAdd}: {toAdd: number}) => {
    console.log('TitleWithRenderProp component rendering');
    return titleWithRenderProp(toAdd);
}

// Wraping ToolTipTitleWithRenderProp with React.memo
const MemoedTitleWithRenderProp = React.memo(TitleWithRenderProp, (prev, next) => {
    console.log("propsAreEqual is called");
    return prev.toAdd === next.toAdd;
});

export const RenderPropHooks = () => {
    const classes = useStyles();
    const contextDefault = 10;
    const numberToAdd = 5;

    return (
        <Context.Provider value={contextDefault}>
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardcontent}>
                        <Typography variant='h4'>Render Prop Rerendering Behavior (with Hooks)</Typography>
                        <br/>
                        <Typography variant='subtitle1' color='textSecondary' component='span'>
                            Hover over each button to show the value of "context + {numberToAdd}".
                            <br/>
                            Context value is 10. Watch console logs for different behaviors.
                        </Typography>
                        <br/>
                        <Tooltip placement='right' title={<TitleWithUseContext toAdd={numberToAdd}/>}>
                            <Button variant='contained' color='primary'>Tooltip title using useContext directly - rerenders on hover</Button>
                        </Tooltip>
                        <br/>
                        <Tooltip placement='right' title={<TitleWithRenderProp toAdd={numberToAdd}/>}>
                            <Button variant='contained' color='primary'>Tooltip title using render prop - rerenders on hover</Button>
                        </Tooltip>
                        <br/>
                        <Tooltip placement='right' title={<MemoedTitleWithRenderProp toAdd={numberToAdd}/>}>
                            <Button variant='contained' color='primary'>Memoized tooltip title with render prop - rerenders on hover</Button>
                        </Tooltip>
                        <br/>
                        <Tooltip placement='right' title={titleWithRenderProp(numberToAdd)}>
                            <Button variant='contained' color='primary'>Tricky One - nested component rerenders on hover</Button>
                        </Tooltip>
                    </CardContent>
                </Card>
            </div>
        </Context.Provider>
    )
};