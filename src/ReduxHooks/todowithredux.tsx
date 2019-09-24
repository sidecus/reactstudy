import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles, Grid, Button } from '@material-ui/core';
import { ITodo, useDispatchers } from './store.redux';
import { activeTodoSelector, completedTodoSelector } from './selectors.redux';
import { TodoList } from './todoList';
import { predefinedTodos } from './predefinedTodos';

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

const createRandomTodo = () => {
    return {
        title: "random todo",
        myDay: Math.random() > 0.5,
    } as ITodo;
};

export const TodoWithRedux = () => {
    const activeTodos = useSelector(activeTodoSelector);
    const completedTodos = useSelector(completedTodoSelector);
    const { populateTodos, addRandomTodo } = useDispatchers();
    const classes = useStyles();

    // "One time" pre-populate
    useEffect(() => {
        populateTodos(predefinedTodos);
    }, [populateTodos]);

    return  (
        <Grid container className={classes.root}>
            <Grid item>
                <Button variant='contained' color='primary' className={classes.button} onClick={() => populateTodos(predefinedTodos)}>Populate</Button>
                <Button variant='contained' color='primary' className={classes.button} onClick={() => addRandomTodo(createRandomTodo())}>Add Todo</Button>
            </Grid>
            <Grid item>
                <TodoList activeTodos={activeTodos} completedTodos={completedTodos} />
            </Grid>
        </Grid>
    );
};