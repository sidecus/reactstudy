import * as React from 'react';
import { ListItemSecondaryAction, FormControlLabel } from '@material-ui/core';
import { IconButton, Checkbox, Switch } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ITodo } from './store.redux';
import { useDispatchers } from './dispatchers.redux';

export interface ITodoActionsProps {
    labelId: string;
    todo: ITodo;
}

// Todo secondary action bar
export const TodoActions = (props: ITodoActionsProps) => {
    const { toggleMyDay, toggleComplete, deleteTodo } = useDispatchers();
    const { todo, labelId } = props;

    return (
        <ListItemSecondaryAction>
            <FormControlLabel
                control={
                    <Switch
                        checked={todo.myDay}
                        tabIndex={-1}
                        color='secondary'
                        inputProps={{ 'aria-labelledby': labelId }}
                        onChange={() => toggleMyDay(todo.id)}
                    />
                }
                label={todo.myDay ? 'Today' : 'Later'}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={todo.completed}
                        tabIndex={-1}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onChange={() => toggleComplete(todo.id)}
                    />
                }
                label='Completed'
            />
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    );
}