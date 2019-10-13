import * as React from 'react';
import { List, ListItem, ListSubheader, ListItemText, ListItemAvatar } from '@material-ui/core';
import { Theme, createStyles, makeStyles, Avatar } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { grey } from '@material-ui/core/colors';
import { ITodo } from './store/store.redux';
import { TodoSecondaryActions } from './todosecondaryactions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        todolistcontainer: {
            width: '50vw',
            minWidth: 520,
            flexGrow: 1,
            overflow: 'auto',
            position: 'relative',   // helps with child todolist absolute positioning
        },
        todolist: {
            // This will limit the list to not grow out of the parent.
            // https://stackoverflow.com/questions/21515042/scrolling-a-flexbox-with-overflowing-content
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.palette.background.paper, // avoid sticky subheader to be transparent
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
        listitemavatar: {
            height: 24,
            width: 24,
            color: grey[200],
            backgroundColor: 'inherit',
        },
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
                                    <Avatar className={classes.listitemavatar}>
                                        {todo.myDay ? <NotificationsActiveIcon/> : <AssignmentIcon/>}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`${todo.title}`} />
                                <TodoSecondaryActions todo={todo} labelId={labelId} />
                            </ListItem>
                        );
                    })}
                </ul>
            </li>
        );
    };

    return (
        <div className={classes.todolistcontainer}>
            <List role="list" className={classes.todolist} subheader={<li />}>
                {activeTodos.length > 0 && todoSubList('Active Todos', activeTodos)}
                {completedTodos.length > 0 && todoSubList('Completed Todos', completedTodos)}
            </List>
        </div>
    );
}
