import * as React from 'react';
import { Provider } from 'react-redux';
import { todoStore } from './store.redux';
import { TodoWithRedux } from './todowithredux';

export const ReduxHooksContainer = () => {
    return  (
        <Provider store={todoStore}>
            <TodoWithRedux />
        </Provider>
    );
};