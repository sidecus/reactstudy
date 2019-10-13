import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { getActiveTodosToShow, getCompletedTodosToShow } from './store/selectors.redux';
import { TodoList } from './todolist';
import { TodoListAppBar } from './todolistappbar';
import { useTodoAppDispatchers } from './store/actions.redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        todoapproot: {
            flexDirection:'column',
            justifyContent:"flex-start",
            alignItems:"center",
            flexGrow: 1,
            display: 'flex',
            margin: 24,
        },
    }),
);

export const TodoReduxApp = () => {
    const activeTodos = useSelector(getActiveTodosToShow);
    const completedTodos = useSelector(getCompletedTodosToShow);
    const classes = useStyles();

    const { dispatchResetTodos } = useTodoAppDispatchers();

    // "One time" pre-populate
    useEffect(() => {
        dispatchResetTodos();
    }, [dispatchResetTodos]);

    return  (
        <div className={classes.todoapproot}>
            <TodoListAppBar />
            <TodoList activeTodos={activeTodos} completedTodos={completedTodos} />
        </div>
    );
};