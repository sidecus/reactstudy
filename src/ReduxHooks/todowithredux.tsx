import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Theme, createStyles, makeStyles, Grid, Button, Checkbox, Avatar } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { ITodo, createAddTodoAction, createToggleCompleteAction } from './store.redux';
import { todoSelector } from './selectors.redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '30vw',
            maxWidth: '320',
        },
        avatar: {
            margin: 10,
        },
        button: {
            margin: theme.spacing(0.5, 0),
        },
    }),
);

export const TodoWithRedux = () => {
    const todos = useSelector(todoSelector);
    const dispatch = useDispatch();
    const classes = useStyles();

    const addTodo = () => {
        dispatch(createAddTodoAction({
            // TODO: we need to set the default values in the reducer
            title: "todo",
            myDay: Math.random() > 0.5,
            due: new Date(),
            complete: false,
        } as ITodo));
    };

    const toggleComplete = (id: number) => {
        dispatch(createToggleCompleteAction(id));
    }

    const todoList = (todos: ITodo[]) => (
        <List dense component="div" role="list" className={classes.list}>
            {todos.map((todo: ITodo) => {
                const labelId = `transfer-list-item-${todo.id}-label`;
    
                return (
                    <ListItem key={todo.id} role="listitem" button>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                {todo.myDay ? <AccessTimeIcon/> : <AssignmentIcon/>}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`${todo.title}${todo.id}`} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                checked={todo.complete}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                onChange={() => toggleComplete(todo.id)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
            <ListItem />
        </List>
    );
    
    return  (
        <Grid container direction='column' justify="flex-start" alignItems="center">
            <Grid item>
                <Button variant='contained' color='primary' onClick={() => addTodo()}>Add Todo</Button>
            </Grid>
            {/* My day list */}
            <Grid item>
                {todoList(todos)}
            </Grid>
        </Grid>
    );
};