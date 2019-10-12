import { actionCreatorFactory } from '../../Common/redux';
import { loadTodos } from '../api/todoapi';
import { ITodo } from './store.redux';

/**
 * Todo app action types
 */
export enum TodoAppActions {
    TODO_ADD = 'AddTodo',
    TODO_AddBatch = 'AddBatchTodos',
    TODO_REMOVE = 'RemoveTodo',
    TODO_REMOVEALL = 'RemoveAll',
    TODO_TOGGLEMYDAY = 'ToggleMyDay',
    TODO_TOGGLECOMPLETED = 'ToggleComplete',
    SETTINGS_SET_SHOWCOMPLETED = 'SetShowCompleted',
    SETTINGS_SET_SHOWMYDAYONLY = 'SetMyDayOnly',
}

/**
 * AddTodo action creator
 */
export const addTodo = actionCreatorFactory<ITodo>(TodoAppActions.TODO_ADD);

/**
 * AddBatchTodo action creator
 */
export const addBatchTodos = actionCreatorFactory<ITodo[]>(TodoAppActions.TODO_AddBatch);

/**
 * RemoveTodo action creator
 */
export const removeTodo = actionCreatorFactory<number>(TodoAppActions.TODO_REMOVEALL);

/**
 * RemoveAll action creator
 */
export const removeAllTodos = actionCreatorFactory(TodoAppActions.TODO_REMOVEALL);

/**
 * ToggleMyDay action creator
 */
export const toggleMyDay = actionCreatorFactory<number>(TodoAppActions.TODO_TOGGLEMYDAY);

/**
 * ToggleCompleted action creator
 */
export const toggleCompleted = actionCreatorFactory<number>(TodoAppActions.TODO_TOGGLECOMPLETED);

/**
 * ShowCompleted settings action creator and reducer
 */
export const setShowCompletedTodos = actionCreatorFactory<boolean>(TodoAppActions.SETTINGS_SET_SHOWCOMPLETED);

/**
 * SetMyDayOnly action creator and reducer
 */
export const setShowMyDayOnlyTodos = actionCreatorFactory<boolean>(TodoAppActions.SETTINGS_SET_SHOWMYDAYONLY);

/**
 * SetMyDayOnly action creator and reducer
 */
export type TodoAppActionTypes =
    ReturnType<typeof addTodo> | ReturnType<typeof addBatchTodos> |
    ReturnType<typeof removeTodo> | ReturnType<typeof removeAllTodos> |
    ReturnType<typeof toggleMyDay> | ReturnType<typeof toggleCompleted> |
    ReturnType<typeof setShowCompletedTodos> | ReturnType<typeof setShowMyDayOnlyTodos>;

/**
 * This is the thunk to dispatch to load predefined todos
 * TODO[sidecus] - review, convenient for simple scenarios like this but too restrictive
 * @param param unused param just to test the call back behavior.
 */
export const createLoadTodoAction = async (param: number) => {
    const todos = await loadTodos();
    return addBatchTodos(todos);
}

