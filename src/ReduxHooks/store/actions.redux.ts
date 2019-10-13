import { actionCreatorFactory } from '../../Common/redux';
import { ITodo } from './store.redux';

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