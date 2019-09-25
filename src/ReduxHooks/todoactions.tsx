import * as React from 'react';
import { ListItemSecondaryAction, FormControlLabel, Checkbox } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { GreenCheckbox } from './greencheckbox';
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
                    <Checkbox icon={<StarBorderRoundedIcon />} checkedIcon={<StarRoundedIcon />} tabIndex={-1}
                        inputProps={{ 'aria-labelledby': labelId }}
                        checked={todo.myDay}
                        onChange={() => toggleMyDay(todo.id)}
                    />
                }
                label={todo.myDay ? 'Today' : 'Later'}
            />
            <FormControlLabel
                control={
                    <GreenCheckbox
                        checked={todo.completed}
                        tabIndex={-1}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onChange={() => toggleComplete(todo.id)}
                    />
                }
                label='Complete'
            />
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    );
}