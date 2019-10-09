import * as React from 'react';
import { useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { activeTodoSelector, completedTodoSelector } from './selectors.redux';
import { TodoList } from './todolist';
import { TodoListAppBar } from './todolistappbar';

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
    const activeTodos = useSelector(activeTodoSelector);
    const completedTodos = useSelector(completedTodoSelector);
    const classes = useStyles();

    return  (
        <div className={classes.todoapproot}>
            <TodoListAppBar />
            <TodoList activeTodos={activeTodos} completedTodos={completedTodos} />
        </div>
    );
};