import { Dispatch } from 'redux';
import { batch } from 'react-redux';
import { ITodo } from './store.redux';
import { loadTodos } from '../api/todoapi';
import { actionCreatorFactory, useMemoNamedDispatchers, NamedDispatcherMapObject } from '../../Common/reduxextensions';

/* action type string enums */

/**
 * Todo app action types
 */
export enum TodoListActions {
    TODO_ADD = 'AddTodo',
    TODO_AddBatch = 'AddBatchTodos',
    TODO_REMOVE = 'RemoveTodo',
    TODO_REMOVEALL = 'RemoveAll',
    TODO_TOGGLEMYDAY = 'ToggleMyDay',
    TODO_TOGGLECOMPLETED = 'ToggleComplete',
}

/**
 * Todo settings action types
 */
export enum TodoSettingsActions {
    SETTINGS_SET_SHOWCOMPLETED = 'SetShowCompleted',
    SETTINGS_SET_SHOWMYDAYONLY = 'SetMyDayOnly',
}

/* basic action creators */

/**
 * AddTodo action creator
 */
export const addTodo = actionCreatorFactory<typeof TodoListActions.TODO_ADD, ITodo>(TodoListActions.TODO_ADD);

/**
 * AddBatchTodo action creator
 */
export const addBatchTodos = actionCreatorFactory<typeof TodoListActions.TODO_AddBatch, ITodo[]>(TodoListActions.TODO_AddBatch);

/**
 * RemoveTodo action creator
 */
export const removeTodo = actionCreatorFactory<typeof TodoListActions.TODO_REMOVE, number>(TodoListActions.TODO_REMOVE);

/**
 * RemoveAll action creator
 */
export const removeAllTodos = actionCreatorFactory<typeof TodoListActions.TODO_REMOVEALL>(TodoListActions.TODO_REMOVEALL);

/**
 * ToggleMyDay action creator
 */
export const toggleMyDay = actionCreatorFactory<typeof TodoListActions.TODO_TOGGLEMYDAY, number>(TodoListActions.TODO_TOGGLEMYDAY);

/**
 * ToggleCompleted action creator
 */
export const toggleCompleted = actionCreatorFactory<typeof TodoListActions.TODO_TOGGLECOMPLETED, number>(TodoListActions.TODO_TOGGLECOMPLETED);

/**
 * ShowCompleted settings action creator and reducer
 */
export const setShowCompletedTodos = actionCreatorFactory<typeof TodoSettingsActions.SETTINGS_SET_SHOWCOMPLETED, boolean>(TodoSettingsActions.SETTINGS_SET_SHOWCOMPLETED);

/**
 * SetMyDayOnly action creator and reducer
 */
export const setShowMyDayOnlyTodos = actionCreatorFactory<typeof TodoSettingsActions.SETTINGS_SET_SHOWMYDAYONLY, boolean>(TodoSettingsActions.SETTINGS_SET_SHOWMYDAYONLY);

/* thunk action creators */

/**
 * This is a thunk action creator used to dispatch to reset todos (load predefined todos from an api)
 * @param param: dummy parameter to illustrate how to pass parameters to thunk action creator
 */
export const resetTodos = () => {
    return async (dispatch: Dispatch<any>) => {
        console.log('resetting todos');
        const apiReturn = await loadTodos();

        // use Redux batch to reduce number of rendering
        return batch(() => {
            dispatch(setShowCompletedTodos(apiReturn.showCompleted));
            dispatch(setShowMyDayOnlyTodos(apiReturn.showMyDayOnly));
            dispatch(addBatchTodos(apiReturn.todos));
        });
    }
};

/* named dispatchers (bound action creators) */

/**
 * Named dispatcher map.
 * DO NOT define this within a function - it'll invalidate memoization when using useMemoNamedDispatchers.
 */
const TodoAppDispatcherMap: NamedDispatcherMapObject = {
    dispatchAddTodo: addTodo,
    dispatchRemoveTodo: removeTodo,
    dispatchToggleCompleted: toggleCompleted,
    dispatchToggleMyDay: toggleMyDay,
    dispatchSetShowCompleted: setShowCompletedTodos,
    dispatchSetShowMyDayOnly: setShowMyDayOnlyTodos,
    dispatchResetTodos: resetTodos,
};

/**
 * Custom hooks for dispatchers (bound action creators).
 * You can create one of this for each domain area to logically separte the dispatchers.
 */
export const useTodoAppDispatchers = () => useMemoNamedDispatchers(TodoAppDispatcherMap);