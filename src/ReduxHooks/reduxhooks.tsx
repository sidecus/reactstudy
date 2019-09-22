import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Theme, createStyles, makeStyles, Grid, Button, Paper, List, ListItem, Checkbox, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { ITodo, createAddTodoAction } from './store.redux';
import { todoSelector } from './selectors.redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 'auto',
            width: '70vw',
            height: '80vh',
        },
        paper: {
            width: '30vw',
            height: '50vh',
            overflow: 'auto',
        },
        button: {
            margin: theme.spacing(0.5, 0),
        },
    }),
);

export const ReduxHooks = () => {
    const todos = useSelector(todoSelector);
    const dispatch = useDispatch();

    const addTodo = () => {
        dispatch(createAddTodoAction({title: "todo", due: new Date()} as ITodo));
    }

    const classes = useStyles();

    const customList = (title: string, todos: ITodo[]) => (
        <>
            <Typography variant='h6'>{title}</Typography>
            <Paper className={classes.paper}>
                <List dense component="div" role="list">
                    {todos.map((todo: ITodo) => {
                        const labelId = `transfer-list-item-${todo}-label`;
        
                        return (
                            <ListItem key={todo.id} role="listitem" button>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={false}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${todo.title}${todo.id}`} />
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
            </Paper>
        </>
    );
    
    return  (
        <Grid container spacing={2} direction='row' justify="center" alignItems="center">
            {/* My day list */}
            <Grid item>
                {customList('Todos', todos)}
                <Button variant='contained' color='primary' onClick={() => addTodo()}>Add Todo</Button>
            </Grid>
            {/* Action buttons */}
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        disabled={todos.length === 0}
                        aria-label="add all to MyDay"
                    >
                    ≫
                    </Button>
                </Grid>
            </Grid>
            {/* My day list */}
            <Grid item>{customList('MyDay', todos)}</Grid>
        </Grid>
    );
};