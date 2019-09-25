import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { ITodo } from './store.redux';
import { predefinedTodos } from './predefinedTodos';
import { showCompletedSelector, showMyDayOnlySelector } from './selectors.redux';
import { useDispatchers } from './dispatchers.redux';
import { GreenCheckbox } from './greencheckbox';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        TodoListAppBar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        todoactioncontrol: {
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

export const TodoListAppBar = () => {
    const showCompleted = useSelector(showCompletedSelector);
    const showMyDayOnly = useSelector(showMyDayOnlySelector);
    const { populateTodos, addRandomTodo, setShowCompleted, setShowMyDayOnly } = useDispatchers();
    const classes = useStyles();

    return (
        <div>
            <Button variant='contained' color='primary' className={classes.todoactioncontrol}
                onClick={() => populateTodos(predefinedTodos)}>
                Populate
            </Button>
            <Button variant='contained' color='primary' className={classes.todoactioncontrol}
                onClick={() => addRandomTodo(createRandomTodo())}>
                Add Todo
            </Button>
            <FormControlLabel
                control={
                    <Checkbox icon={<StarBorderRoundedIcon />} checkedIcon={<StarRoundedIcon />} tabIndex={-1}
                        checked={showMyDayOnly}
                        onChange={() => setShowMyDayOnly(!showMyDayOnly)}
                    />
                }
                label='TodayOnly'
            />
            <FormControlLabel className={classes.todoactioncontrol}
                control={
                    <GreenCheckbox tabIndex={-1}
                        checked={showCompleted}
                        onChange={() => setShowCompleted(!showCompleted)}
                    />
                }
                label='ShowCompleted'
            />
        </div>
    );
}