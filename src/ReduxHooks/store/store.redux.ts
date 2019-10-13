import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { TodoListActions, TodoSettingsActions } from './actions.redux';
import { addTodoReducer, addBatchTodoReducer, removeTodoReducer, removeAllReducer, toggleMyDayReducer, toggleCompletedReducer, setShowCompletedReducer, setMyDayOnlyReducer } from './reducers.redux';
import { slicedReducerFactory } from '../../Common/redux';

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
 * default settings
 */
const defaultSettings = {
    showCompleted: true,
    myDayOnly: false,
} as ITodoAppSettings;

/**
 * Todo items reducer
 * @param state todo items state
 * @param action todo action to dispatch
 */
const todoListReducer = slicedReducerFactory<ITodo[], TodoListActions>([], {
    [TodoListActions.TODO_ADD]: [addTodoReducer],
    [TodoListActions.TODO_AddBatch]: [addBatchTodoReducer],
    [TodoListActions.TODO_REMOVE]: [removeTodoReducer],
    [TodoListActions.TODO_REMOVEALL]: [removeAllReducer],
    [TodoListActions.TODO_TOGGLEMYDAY]: [toggleMyDayReducer],
    [TodoListActions.TODO_TOGGLECOMPLETED]: [toggleCompletedReducer],
});

/**
 * settings reducer
 * @param state settings state
 * @param action settings action
 */
const settingsReducer = slicedReducerFactory<ITodoAppSettings, TodoSettingsActions>(defaultSettings, {
    [TodoSettingsActions.SETTINGS_SET_SHOWCOMPLETED]: [setShowCompletedReducer],
    [TodoSettingsActions.SETTINGS_SET_SHOWMYDAYONLY]: [setMyDayOnlyReducer],
});

/**
 * todo app root reducer
 */
const rootReducer = combineReducers({todo: todoListReducer, settings: settingsReducer});

/**
 * todo app store, created with thunk middleware and redux dev tools
 */
export const todoStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

/**
 * Todo app store type
 */
export type ITodoAppStore = ReturnType<typeof rootReducer>;