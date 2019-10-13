import * as React from 'react';

import { ListItemSecondaryAction, FormControlLabel, Checkbox } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { GreenCheckbox } from './greencheckbox';

import { ITodo } from './store/store.redux';
import { useTodoAppDispatchers } from './store/actions.redux';

export interface ITodoActionsProps {
    labelId: string;
    todo: ITodo;
}

// Todo secondary action bar
export const TodoSecondaryActions = (props: ITodoActionsProps) => {
    const { dispatchToggleMyDay, dispatchToggleCompleted, dispatchRemoveTodo } = useTodoAppDispatchers();
    const { todo, labelId } = props;

    return (
        <ListItemSecondaryAction>
            <FormControlLabel
                control={
                    <Checkbox icon={<StarBorderRoundedIcon />} checkedIcon={<StarRoundedIcon />} tabIndex={-1}
                        inputProps={{ 'aria-labelledby': labelId }}
                        checked={todo.myDay}
                        onChange={() => dispatchToggleMyDay(todo.id)}
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
                        onChange={() => dispatchToggleCompleted(todo.id)}
                    />
                }
                label='Complete'
            />
            <IconButton edge="end" aria-label="delete" onClick={() => dispatchRemoveTodo(todo.id)}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    );
}