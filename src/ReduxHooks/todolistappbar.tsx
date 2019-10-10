import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { ITodo } from './store/store.redux';
import { showCompletedSelector, showMyDayOnlySelector } from './store/selectors.redux';
import { useDispatchers } from './store/dispatchers.redux';
import { GreenCheckbox } from './greencheckbox';
import { useEffect } from 'react';

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
    const showCompleted = useSelector(showCompletedSelector);
    const showMyDayOnly = useSelector(showMyDayOnlySelector);
    const { populateTodos, addRandomTodo, setShowCompleted, setShowMyDayOnly } = useDispatchers();
    const classes = useStyles();

    // "One time" pre-populate
    useEffect(() => {
        populateTodos(Math.random());
    }, [populateTodos]);

    return (
        <>
            <div className={classes.todoactionappbar}>
                <Button variant='contained' color='primary' className={classes.todoactioncontrol}
                    onClick={() => populateTodos(Math.random())}>
                    Populate
                </Button>
                <Button variant='contained' color='primary' className={classes.todoactioncontrol}
                    onClick={() => addRandomTodo(createRandomTodo())}>
                    Add Todo
                </Button>
            </div>
            <div className={classes.todoactionappbar}>
                <FormControlLabel className={classes.todoactioncontrol}
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
        </>
    );
}