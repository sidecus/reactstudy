import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

import { GreenCheckbox } from './greencheckbox';
import { ITodo } from './store/store.redux';
import { getShowCompleted, getShowMyDayOnly } from './store/selectors.redux';
import { useDispatchers } from './store/dispatchers.redux';

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

const createRandomTodo = () => {
    return {
        title: "random todo",
        myDay: Math.random() > 0.5,
    } as ITodo;
};

export const TodoListAppBar = () => {
    const showCompleted = useSelector(getShowCompleted);
    const showMyDayOnly = useSelector(getShowMyDayOnly);
    const { dispatchResetTodos, dispatchAddTodo, dispatchSetShowCompleted, dispatchSetShowMyDayOnly } = useDispatchers();
    const classes = useStyles();

    // "One time" pre-populate
    useEffect(() => {
        dispatchResetTodos(Math.random());
    }, [dispatchResetTodos]);

    return (
        <>
            <div className={classes.todoactionappbar}>
                <Button variant='contained' color='primary' className={classes.todoactioncontrol}
                    onClick={() => dispatchResetTodos(Math.random())}>
                    Reset Todos
                </Button>
                <Button variant='contained' color='primary' className={classes.todoactioncontrol}
                    onClick={() => dispatchAddTodo(createRandomTodo())}>
                    Add New Todo
                </Button>
            </div>
            <div className={classes.todoactionappbar}>
                <FormControlLabel className={classes.todoactioncontrol}
                    control={
                        <Checkbox icon={<StarBorderRoundedIcon />} checkedIcon={<StarRoundedIcon />} tabIndex={-1}
                            checked={showMyDayOnly}
                            onChange={() => dispatchSetShowMyDayOnly(!showMyDayOnly)}
                        />
                    }
                    label='TodayOnly'
                />
                <FormControlLabel className={classes.todoactioncontrol}
                    control={
                        <GreenCheckbox tabIndex={-1}
                            checked={showCompleted}
                            onChange={() => dispatchSetShowCompleted(!showCompleted)}
                        />
                    }
                    label='ShowCompleted'
                />
            </div>
        </>
    );
}