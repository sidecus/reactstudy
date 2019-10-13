import { Dispatch } from 'redux';
import { loadTodos } from '../api/todoapi';
import { addBatchTodos } from './actions.redux';

/**
 * This is a thunk action creator used to dispatch to reset todos (load predefined todos from an api)
 * @param param: dummy parameter to illustrate how to pass parameters to thunk action creator
 */
export const resetTodos = (param: number) => {
    return async (dispatch: Dispatch<any>) => {
        console.log(`param for resetTodos is ${param}`);
        const todos = await loadTodos();
        return dispatch(addBatchTodos(todos));
    }
};

