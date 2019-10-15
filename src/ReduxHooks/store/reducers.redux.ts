import { IAction } from '../../Common/reduxextensions';
import { ITodo, ITodoAppSettings } from './store.redux';
import { TodoListActions, TodoSettingsActions } from './actions.redux';

/**
 * AddTodo reducer
 */
export const addTodoReducer = (state: ITodo[], action: IAction<TodoListActions.TODO_ADD, ITodo>) => {
    // assign id for the new todo. if it's the first, set it to 0.
    // otherwise set it to the current max id + 1 to avoid conflicts
    const oldState = state!;
    const newId = oldState.length > 0 ? (Math.max(...oldState.map(t => t.id)) + 1) : 0;
    const newTodo = {id: newId, due: new Date(), myDay: false, completed: false, ...action.payload};
    newTodo.title = `${newTodo.title} ${newTodo.id}`;
    return [...oldState, newTodo];
};

/**
 * AddBatchTodo action creator
 */
export const addBatchTodoReducer = (state: ITodo[], action: IAction<TodoListActions.TODO_AddBatch, ITodo[]>) => {
    return [...action.payload];
};

/**
 * RemoveTodo and reducer
 */
export const removeTodoReducer = (state: ITodo[], action: IAction<TodoListActions.TODO_REMOVE, number>) => {
    // remove the given todo with the id
    const newState = [...state!];
    newState.splice(newState.findIndex(t => t.id === action.payload), 1);
    return newState;
};

/**
 * RemoveAll reducer
 */
export const removeAllReducer = (state: ITodo[], action: IAction<TodoListActions.TODO_REMOVEALL>) => {
    return [];
};

/**
 * ToggleMyDay reducer
 */
export const toggleMyDayReducer = (state: ITodo[], action: IAction<TodoListActions.TODO_TOGGLEMYDAY, number>) => {
    const oldState = state!;
    // toggle the myday status for the given todo if exists
    const index = oldState.findIndex(t => t.id === action.payload);
    if (index >= 0) {
        const todo = oldState[index];
        const newState = [...oldState];
        newState[index] = {...todo, myDay: !todo.myDay};
        return newState;
    }
    return oldState;
};

/**
 * ToggleCompleted reducer
 */
export const toggleCompletedReducer = (state: ITodo[], action: IAction<TodoListActions.TODO_TOGGLECOMPLETED, number>) => {
    const oldState = state!;
    // toggle the complete status for the given todo (if exists)
    const index = oldState.findIndex(t => t.id === action.payload);
    if (index >= 0) {
        const todo = oldState[index];
        const newState = [...oldState];
        newState[index] = {...todo, completed: !todo.completed};
        return newState;
    }
    return oldState;
};

/**
 * ShowCompleted settings reducer
 */
export const setShowCompletedReducer = (state: ITodoAppSettings, action: IAction<TodoSettingsActions.SETTINGS_SET_SHOWCOMPLETED, boolean>) => {
    return {...state!, showCompleted: action.payload};
};

/**
 * SetMyDayOnly reducer
 */
export const setMyDayOnlyReducer = (state: ITodoAppSettings, action: IAction<TodoSettingsActions.SETTINGS_SET_SHOWMYDAYONLY, boolean>) => {
    return {...state!, myDayOnly: action.payload};
};
