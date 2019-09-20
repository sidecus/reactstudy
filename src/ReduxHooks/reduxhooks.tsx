import * as React from 'react';
import { useSelector } from 'react-redux';
// import { createSelector } from 'reselect';
import { todoSelector, myDaySelector } from './store.redux'

export const ReduxHooks = () => {
    const todos = useSelector(todoSelector);

    return  (
        <div>{todos}</div>
    );
};