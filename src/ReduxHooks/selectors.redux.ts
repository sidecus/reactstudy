import { ITodoAppStore } from "./store.redux";
import { createSelector } from 'reselect';

// top todo selector
export const todoStateSelector = (store: ITodoAppStore) => store.todo;

// top settings selector
export const settingsStateSelector = (store: ITodoAppStore) => store.settings;

// todo selector
export const todoSelector = createSelector(
    [todoStateSelector, settingsStateSelector],
    (todos, settings) => todos.filter(x => settings.showCompleted || !x.completed)
);

// show completed selector
export const showCompletedSelector = createSelector(
    [settingsStateSelector],
    settings => settings.showCompleted
);

// show my day only selector
export const showMyDayOnlySelector = createSelector(
    [settingsStateSelector],
    settings => settings.myDayOnly
);

// active todo selector
export const activeTodoSelector = createSelector(
    [todoSelector, showMyDayOnlySelector],
    (todos, showMyDayOnly) => todos.filter(x => !x.completed && (!showMyDayOnly || x.myDay))
);

// completed todo selector
export const completedTodoSelector = createSelector(
    [todoSelector, showCompletedSelector, showMyDayOnlySelector],
    (todos, showCompleted, showMyDayOnly) => showCompleted ? todos.filter(x => x.completed && (!showMyDayOnly || x.myDay)) : []
);
