import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles, Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { activeTodoSelector, completedTodoSelector, showCompletedSelector, showMyDayOnlySelector } from './selectors.redux';
import { useDispatchers } from './dispatchers.redux';
import { ITodo } from './store.redux';
import { TodoList } from './todolist';
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
    const showCompleted = useSelector(showCompletedSelector);
    const showMyDayOnly = useSelector(showMyDayOnlySelector);
    const { populateTodos, addRandomTodo, setShowCompleted, setShowMyDayOnly } = useDispatchers();
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showMyDayOnly}
                            tabIndex={-1}
                            onChange={() => setShowMyDayOnly(!showMyDayOnly)}
                        />
                    }
                    label='ShowTodayOnly'
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showCompleted}
                            tabIndex={-1}
                            onChange={() => setShowCompleted(!showCompleted)}
                        />
                    }
                    label='ShowCompleted'
                />

            </Grid>
            <Grid item>
                <TodoList activeTodos={activeTodos} completedTodos={completedTodos} />
            </Grid>
        </Grid>
    );
};