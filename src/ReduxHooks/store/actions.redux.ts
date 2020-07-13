import { Dispatch } from 'redux';
import { batch } from 'react-redux';
import { ITodo } from './store.redux';
import { loadTodos } from '../api/todoapi';
import { createActionCreator, useBoundActions } from 'roth.js';

/* action type string enums */

/**
 * Todo app action types
 */
export enum TodoListActions {
    TODO_ADD = 'AddTodo',
    TODO_AddBatch = 'SetTodos',
    TODO_REMOVE = 'RemoveTodo',
    TODO_REMOVEALL = 'RemoveAll',
    TODO_TOGGLEMYDAY = 'ToggleMyDay',
    TODO_TOGGLECOMPLETED = 'ToggleComplete',
}

/**
 * AddTodo action creator
 */
export const addTodo = createActionCreator<ITodo>(TodoListActions.TODO_ADD);
export type AddTodoAction = ReturnType<typeof addTodo>

/**
 * AddBatchTodo action creator
 */
export const setTodos = createActionCreator<ITodo[]>(TodoListActions.TODO_AddBatch);
export type SetTodosAction = ReturnType<typeof setTodos>

/**
 * RemoveTodo action creator
 */
export const removeTodo = createActionCreator<number>(TodoListActions.TODO_REMOVE);
export type RemoveTodoAction = ReturnType<typeof removeTodo>

/**
 * RemoveAll action creator
 */
export const removeAllTodos = createActionCreator(TodoListActions.TODO_REMOVEALL);
export type RemoveAllTodosAction = ReturnType<typeof removeAllTodos>

/**
 * ToggleMyDay action creator
 */
export const toggleMyDay = createActionCreator<number>(TodoListActions.TODO_TOGGLEMYDAY);
export type ToggleMyDayAction = ReturnType<typeof toggleMyDay>

/**
 * ToggleCompleted action creator
 */
export const toggleCompleted = createActionCreator<number>(TodoListActions.TODO_TOGGLECOMPLETED);
export type ToggleCompletedAction = ReturnType<typeof toggleCompleted>

/**
 * Todo settings action types
 */
export enum TodoSettingsActions {
    SETTINGS_SET_SHOWCOMPLETED = 'SetShowCompleted',
    SETTINGS_SET_SHOWMYDAYONLY = 'SetMyDayOnly',
}

/**
 * ShowCompleted settings action creator
 */
export const setShowCompletedTodos = createActionCreator<boolean>(TodoSettingsActions.SETTINGS_SET_SHOWCOMPLETED);
export type SetShowCompletedAction = ReturnType<typeof setShowCompletedTodos>

/**
 * SetMyDayOnly settings action creator
 */
export const setShowMyDayOnlyTodos = createActionCreator<boolean>(TodoSettingsActions.SETTINGS_SET_SHOWMYDAYONLY);
export type SetShowMyDayOnlyAction = ReturnType<typeof setShowMyDayOnlyTodos>


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
            dispatch(setTodos(apiReturn.todos));
        });
    }
};

/* named dispatchers (bound action creators) */
const namedActionCreators = {
    addTodo,
    removeTodo,
    toggleCompleted,
    toggleMyDay,
    setShowCompletedTodos,
    setShowMyDayOnlyTodos,
    resetTodos,
}

/**
 * Custom hooks for dispatchers (bound action creators).
 * You can create one of this for each domain area to logically separate the dispatchers.
 */
export const useTodoBoundActions = () => useBoundActions(namedActionCreators);
