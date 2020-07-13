import * as React from 'react';
import { useSelector } from 'react-redux';

import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

import { GreenCheckbox } from './greencheckbox';
import { ITodo } from './store/store.redux';
import { getShowCompleted, getShowMyDayOnly } from './store/selectors.redux';
import { useTodoBoundActions } from './store/actions.redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        todoactionappbar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        todoactioncontrol: {
            margin: theme.spacing(1),
        },
    }),
);

const createRandomTodo: () => ITodo = () => {
    return {
        id: -1, // this will be overwritten
        title: "random todo",
        myDay: Math.random() > 0.5,
        completed: false
    };
};

export const TodoListAppBar = () => {
    const showCompleted = useSelector(getShowCompleted);
    const showMyDayOnly = useSelector(getShowMyDayOnly);
    const { resetTodos, addTodo, setShowCompletedTodos: showCompletedTodos, setShowMyDayOnlyTodos: showMyDayOnlyTodos } = useTodoBoundActions();
    const classes = useStyles();

    return (
        <>
            <div className={classes.todoactionappbar}>
                <Button variant='contained' color='primary' className={classes.todoactioncontrol}
                    onClick={resetTodos}>
                    Reset App
                </Button>
                <Button variant='contained' color='primary' className={classes.todoactioncontrol}
                    onClick={() => addTodo(createRandomTodo())}>
                    Add New Todo
                </Button>
            </div>
            <div className={classes.todoactionappbar}>
                <FormControlLabel className={classes.todoactioncontrol}
                    control={
                        <Checkbox icon={<StarBorderRoundedIcon />} checkedIcon={<StarRoundedIcon />} tabIndex={-1}
                            checked={showMyDayOnly}
                            onChange={() => showMyDayOnlyTodos(!showMyDayOnly)}
                        />
                    }
                    label='TodayOnly'
                />
                <FormControlLabel className={classes.todoactioncontrol}
                    control={
                        <GreenCheckbox tabIndex={-1}
                            checked={showCompleted}
                            onChange={() => showCompletedTodos(!showCompleted)}
                        />
                    }
                    label='ShowCompleted'
                />
            </div>
        </>
    );
}