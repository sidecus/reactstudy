import { ITodoAppStore, ITodo } from "./store.redux";
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

// active todo selector
export const activeTodoSelector = createSelector(
    [todoSelector],
    (todos) => todos.filter(x => !x.completed)
);

// completed todo selector
export const completedTodoSelector = createSelector(
    [todoSelector],
    (todos) => todos.filter(x => x.completed)
);

// my day todo selector
export const myDaySelector = createSelector(
    [todoSelector],
    (todos: ITodo[]) => todos.filter(x => x.myDay)
);