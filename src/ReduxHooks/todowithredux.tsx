import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Theme, createStyles, makeStyles, Grid, Button, IconButton, Checkbox, Avatar, Switch } from '@material-ui/core';
import { List, ListItem, ListSubheader, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';
import { ITodo, createAddTodoAction, createToggleCompleteAction, createToggleMyDayAction, createRemoveTodoAction } from './store.redux';
import { activeTodoSelector, completedTodoSelector } from './selectors.redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '50vw',
            maxWidth: '480',
            height: '100%',
            maxHeight: '70vh',
            position: 'relative',
            overflow: 'auto',
            backgroundColor: theme.palette.background.paper,
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
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
    const activeTodos = useSelector(activeTodoSelector);
    const completedTodos = useSelector(completedTodoSelector);
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

    const deleteTodo = (id: number) => {
        dispatch(createRemoveTodoAction(id));
    };

    const toggleComplete = (id: number) => {
        dispatch(createToggleCompleteAction(id));
    }

    const toggleMyDay = (id: number) => {
        dispatch(createToggleMyDayAction(id));
    }

    // todo list component
    const todoList = (subheader: string, todos: ITodo[]) => {
        return (
            <li key={`section-${subheader}`} className={classes.listSection}>
                <ul className={classes.ul}>
                    <ListSubheader>{subheader}</ListSubheader>
                    {todos.map((todo: ITodo) => {
                        const labelId = `transfer-list-item-${todo.id}-label`;
                        return (
                            <ListItem key={todo.id} role="listitem">
                                <Checkbox
                                    checked={todo.complete}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onChange={() => toggleComplete(todo.id)}
                                />
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        {todo.myDay ? <AccessTimeIcon/> : <AssignmentIcon/>}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`${todo.title}${todo.id}`} />
                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={todo.myDay}
                                        tabIndex={-1}
                                        color='secondary'
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        onChange={() => toggleMyDay(todo.id)}
                                    />
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </ul>
            </li>
        );
    };
    
    return  (
        <Grid container direction='column' justify="flex-start" alignItems="center">
            <Grid item>
                <Button variant='contained' color='primary' onClick={() => addTodo()}>Add Todo</Button>
            </Grid>
            {/* My day list */}
            <Grid item>
                <List role="list" className={classes.list} subheader={<li />}>
                    {activeTodos.length > 0 && todoList('Active Todos', activeTodos)}
                    {completedTodos.length > 0 && todoList('Completed Todos', completedTodos)}
                </List>
            </Grid>
        </Grid>
    );
};