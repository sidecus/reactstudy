import { ITodoAppStore } from "./store.redux";
import { createSelector } from 'reselect';

/**
 * todo app todo items selector
 * @param store todo app store
 */
const todoStateSelector = (store: ITodoAppStore) => store.todo;

/**
 * todo app settings selector
 * @param store todo app store
 */
const settingsStateSelector = (store: ITodoAppStore) => store.settings;

/**
 * "ShowCompleted" setting selector
 */
export const showCompletedSelector = createSelector(
    [settingsStateSelector],
    settings => settings.showCompleted
);

/**
 * "ShowMyDayOnly" setting selector
 */
export const showMyDayOnlySelector = createSelector(
    [settingsStateSelector],
    settings => settings.myDayOnly
);

/**
 * 'visible' todo items selector after applying filtering options from settings
 */
export const todoSelector = createSelector(
    [todoStateSelector, showCompletedSelector, showMyDayOnlySelector],
    (todos, showCompleted, showMyDayOnly) => {
        return todos.filter(x => (showCompleted || !x.completed) && (!showMyDayOnly || x.myDay));
    }
);

/**
 * active todo selector
 */
export const activeTodoSelector = createSelector(
    [todoSelector],
    todos => todos.filter(x => !x.completed)
);

/**
 * completed todo selector
 */
export const completedTodoSelector = createSelector(
    [todoSelector],
    todos => todos.filter(x => x.completed)
);
