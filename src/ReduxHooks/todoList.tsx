import * as React from 'react';
import { List, ListItem, ListSubheader, ListItemText, ListItemAvatar } from '@material-ui/core';
import { Theme, createStyles, makeStyles, Avatar } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { ITodo } from './store.redux';
import { TodoActions } from './todoactions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '50vw',
            minWidth: '480',
            maxHeight: '70vh',
            flexGrow: 1,
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
        todaylabel: {
            width: 45,
        }
    }),
);

export interface ITodoListProps {
    activeTodos: ITodo[];
    completedTodos: ITodo[];
}

export const TodoList = (props: ITodoListProps) => {
    const classes = useStyles();
    const { activeTodos, completedTodos } = props;

    // todo sub list component
    const todoSubList = (subheader: string, todos: ITodo[]) => {
        return (
            <li key={`section-${subheader}`} className={classes.listSection}>
                <ul className={classes.ul}>
                    <ListSubheader>{subheader}</ListSubheader>
                    {todos.map((todo: ITodo) => {
                        const labelId = `todo-list-item-${todo.id}-label`;
                        return (
                            <ListItem key={todo.id} role="listitem">
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        {todo.myDay ? <NotificationsActiveIcon/> : <AssignmentIcon/>}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`${todo.title}`} />
                                <TodoActions todo={todo} labelId={labelId} />
                            </ListItem>
                        );
                    })}
                </ul>
            </li>
        );
    };

    return (
        <List role="list" className={classes.list} subheader={<li />}>
            {activeTodos.length > 0 && todoSubList('Active Todos', activeTodos)}
            {completedTodos.length > 0 && todoSubList('Completed Todos', completedTodos)}
        </List>
    );
}
