import { ITodo, ITodoAppSettings } from './store.redux';
import {
    AddTodoAction,
    SetTodosAction,
    RemoveTodoAction,
    RemoveAllTodosAction,
    ToggleMyDayAction,
    ToggleCompletedAction,
    SetShowCompletedAction,
    SetShowMyDayOnlyAction
} from './actions.redux';

/**
 * AddTodo reducer
 */
export const addTodoReducer = (state: ITodo[], action: AddTodoAction) => {
    // assign id for the new todo. if it's the first, set it to 0.
    // otherwise set it to the current max id + 1 to avoid conflicts
    const oldState = state;
    const newId = oldState.length > 0 ? (Math.max(...oldState.map(t => t.id)) + 1) : 0;
    const newTodo = { due: new Date(), ...action.payload, id: newId };
    newTodo.title = `${newTodo.title} ${newTodo.id}`;
    return [...oldState, newTodo];
};

/**
 * AddBatchTodo reducer
 */
export const addBatchTodoReducer = (state: ITodo[], action: SetTodosAction) => {
    return [...action.payload];
};

/**
 * RemoveTodo and reducer
 */
export const removeTodoReducer = (state: ITodo[], action: RemoveTodoAction) => {
    // remove the given todo with the id
    const newState = [...state!];
    newState.splice(newState.findIndex(t => t.id === action.payload), 1);
    return newState;
};

/**
 * RemoveAll reducer
 */
export const removeAllReducer = (state: ITodo[], action: RemoveAllTodosAction) => {
    return [];
};

/**
 * ToggleMyDay reducer
 */
export const toggleMyDayReducer = (state: ITodo[], action: ToggleMyDayAction) => {
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
export const toggleCompletedReducer = (state: ITodo[], action: ToggleCompletedAction) => {
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
export const setShowCompletedReducer = (state: ITodoAppSettings, action: SetShowCompletedAction) => {
    return {...state!, showCompleted: action.payload};
};

/**
 * SetMyDayOnly reducer
 */
export const setMyDayOnlyReducer = (state: ITodoAppSettings, action: SetShowMyDayOnlyAction) => {
    return {...state!, myDayOnly: action.payload};
};
