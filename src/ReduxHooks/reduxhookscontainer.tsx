import * as React from 'react';
import { Provider } from 'react-redux';
import { todoStore } from './store.redux';
import { TodoReduxApp } from './todoreduxapp';

export const ReduxHooksContainer = () => {
    return  (
        <Provider store={todoStore}>
            <TodoReduxApp />
        </Provider>
    );
};