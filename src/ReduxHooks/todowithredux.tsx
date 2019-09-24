import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Theme, createStyles, makeStyles, Grid, Button } from '@material-ui/core';
import { ITodo, createAddTodoAction, createAddBatchTodosAction } from './store.redux';
import { activeTodoSelector, completedTodoSelector } from './selectors.redux';
import { TodoList } from './todoList';
import { predefinedTodos } from './predefinedTodos';
import { useEffect, useCallback } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexDirection:'column',
            justifyContent:"flex-start",
            alignItems:"center",
            flexGrow: 1,
            marginTop: '48px',
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

export const TodoWithRedux = () => {
    const activeTodos = useSelector(activeTodoSelector);
    const completedTodos = useSelector(completedTodoSelector);
    const dispatch = useDispatch();
    const classes = useStyles();

    // Populate with predefined todos. We use the useCallbacl here to follow hooks dependency rules and 
    // avoid infinite rerenering.
    // We need to specify this as part of the useEffect dependencies.
    // If we don't define this as callback, then a new function is created during each render.
    // In that case, the useEffect will be run forever.
    const populateTodos = useCallback(() => {
        dispatch(createAddBatchTodosAction(predefinedTodos));
    }, [dispatch]);

    // Note we are not using "useCallback" here, since this won't cause the above issue and we want a new due date.
    const addRandomTodo = () => 
        dispatch(createAddTodoAction({
            title: "random todo",
            myDay: Math.random() > 0.5,
        } as ITodo));

    useEffect(() => {
        // One time pre-populate
        populateTodos();
    }, [populateTodos]);

    return  (
        <Grid container className={classes.root}>
            <Grid item>
                <Button variant='contained' color='primary' className={classes.button} onClick={() => populateTodos()}>Populate</Button>
                <Button variant='contained' color='primary' className={classes.button} onClick={() => addRandomTodo()}>Add Todo</Button>
            </Grid>
            <Grid item>
                <TodoList activeTodos={activeTodos} completedTodos={completedTodos} />
            </Grid>
        </Grid>
    );
};