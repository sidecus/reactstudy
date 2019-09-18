import * as React from 'react';
import { useSelector } from 'react-redux';
// import { createSelector } from 'reselect';
import { ITodoAppStore } from './store.redux'

export const ReduxHooks = () => {
    const todosSelector = useSelector((store: ITodoAppStore) => store.getState());

    return  (
        <div>{todosSelector}</div>
    );
};