import * as React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
/*
import { createStore } from 'redux';

interface IStore {
    tweets: string[];
}
*/

const baseSelector = () => 1;
const childSelector = createSelector([baseSelector], (x: number) => x + 1);

export const ReduxHooks = () => {
    const child = useSelector(() => childSelector);
    return  (
        <div>{child}</div>
    );
};