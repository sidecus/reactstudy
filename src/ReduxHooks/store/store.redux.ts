import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { IAction } from '../../Common/redux';
import { TodoAppActions } from './actions.redux';
import { addTodoReducer, addBatchTodoReducer, removeTodoReducer, removeAllReducer, toggleMyDayReducer, toggleCompletedReducer, setShowCompletedReducer, setMyDayOnlyReducer } from './reducers.redux';

/**
 * ITodo for a todo item
 */
export interface ITodo {
    id: number;
    title: string;
    due?: Date;
    myDay: boolean;
    completed: boolean;
}

/**
 * Interface for todo app settings
 */
export interface ITodoAppSettings {
    showCompleted: boolean;
    myDayOnly: boolean;
}

/**
 * Todo items reducer
 * @param state todo items state
 * @param action todo action to dispatch
 */
const todoReducer = (state: ITodo[] = [], action: IAction) => {
    let newState = state;
    switch (action.type) {
        case TodoAppActions.TODO_ADD:
            newState = addTodoReducer(state, action);
            break;
        case TodoAppActions.TODO_AddBatch:
            newState = addBatchTodoReducer(state, action);
            break;
        case TodoAppActions.TODO_REMOVEALL:
            newState = removeTodoReducer(state, action);
            break;
        case TodoAppActions.TODO_REMOVEALL:
            newState = removeAllReducer(state, action);
            break;
        case TodoAppActions.TODO_TOGGLEMYDAY:
            newState = toggleMyDayReducer(state, action);
            break;
        case TodoAppActions.TODO_TOGGLECOMPLETED:
            newState = toggleCompletedReducer(state, action);
            break;
        }

    return newState;
}

/**
 * default settings
 */
const defaultSettings = {
    showCompleted: true,
    myDayOnly: false,
} as ITodoAppSettings;

/**
 * settings reducer
 * @param state settings state
 * @param action settings action
 */
const settingsReducer = (state: ITodoAppSettings = defaultSettings, action: IAction) => {
    let newState = state;
    switch (action.type) {
        case TodoAppActions.SETTINGS_SET_SHOWCOMPLETED:
            newState = setShowCompletedReducer(state, action);
            break;
        case TodoAppActions.SETTINGS_SET_SHOWMYDAYONLY:
            newState = setMyDayOnlyReducer(state, action);
            break;
        }

    return newState;
}


/**
 * todo app root reducer
 */
const rootReducer = combineReducers({todo: todoReducer, settings: settingsReducer});

/**
 * todo app store, created with thunk middleware and redux dev tools
 */
export const todoStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

/**
 * Todo app store type
 */
export type ITodoAppStore = ReturnType<typeof rootReducer>;