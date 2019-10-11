import { ITodoAppStore } from "./store.redux";
import { createSelector } from 'reselect';

/**
 * todo app todo items selector
 * @param store todo app store
 */
const getTodos = (store: ITodoAppStore) => store.todo;

/**
 * todo app settings selector
 * @param store todo app store
 */
const getSettings = (store: ITodoAppStore) => store.settings;

/**
 * "ShowCompleted" setting selector
 */
export const getShowCompleted = createSelector(
    [getSettings],
    settings => settings.showCompleted
);

/**
 * "ShowMyDayOnly" setting selector
 */
export const getShowMyDayOnly = createSelector(
    [getSettings],
    settings => settings.myDayOnly
);

/**
 * 'visible' todo items selector after applying filtering options from settings
 */
export const getTodosToShow = createSelector(
    [getTodos, getShowCompleted, getShowMyDayOnly],
    (todos, showCompleted, showMyDayOnly) => {
        return todos.filter(x => (showCompleted || !x.completed) && (!showMyDayOnly || x.myDay));
    }
);

/**
 * active todo selector
 */
export const getActiveTodosToShow = createSelector(
    [getTodosToShow],
    todos => todos.filter(x => !x.completed)
);

/**
 * completed todo selector
 */
export const getCompletedTodosToShow = createSelector(
    [getTodosToShow],
    todos => todos.filter(x => x.completed)
);
