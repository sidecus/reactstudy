import * as React from 'react';
import { Provider } from 'react-redux';
import { todoStore } from './store.redux';
import { ReduxHooks } from './reduxhooks';

export const ReduxHooksContainer = () => {
    return  (
        <Provider store={todoStore}>
            <ReduxHooks />
        </Provider>
    );
};