import { ITodoAppStore } from "./store.redux";
// import { createSelector } from 'reselect';

//top level selectors
export const todoSelector = (store: ITodoAppStore) => store.todo;
export const myDaySelector = (store: ITodoAppStore) => store.settings;