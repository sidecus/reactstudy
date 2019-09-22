import { createStore, combineReducers } from 'redux';

export interface ITodo {
    id: number;
    title: string;
    due: Date;
    myDay: boolean;
}

// Actions and action creators
enum Actions {
    AddTodo = "AddTodo",
    RemoveTodo = "RemoveTodo",
    ToggleMyDay = "ToggleMyDay",
}

interface IAction<T = any> {
    type: Actions;
    payload?: T;
}

export const createAddTodoAction = (todo: ITodo) => {
    return { type: Actions.AddTodo, payload: todo } as IAction<ITodo>;
}

export const createRemoveTodoAction = (id: number) => {
    return { type: Actions.AddTodo, payload: id } as IAction<number>;
}

export const toggleMyDay = (id: number) => {
    return { type: Actions.ToggleMyDay, payload: id } as IAction<number>;
}

// todo list reducer
const todoReducer = (state: ITodo[] = [], action: IAction) => {
    let newState: ITodo[] = [...state];
    switch (action.type) {
        case Actions.AddTodo:
            // assign id for the new todo. if it's the first, set it to 0.
            // otherwise set it to the current max id + 1 to avoid conflicts
            const newId = newState.length > 0 ? (Math.max(...newState.map(t => t.id)) + 1) : 0;
            const newTodo = {...action.payload as ITodo, id: newId};
            newState.push(newTodo);
            break;
        case Actions.RemoveTodo:
            // remove the given todo with the id
            const idToRemove = action.payload as number;
            newState.splice(newState.findIndex(t => t.id === idToRemove), 1);
            break;
        case Actions.ToggleMyDay:
            // toggle the myday status for the given todo
            const idToToggle = action.payload as number;
            const indexToToggle = newState.findIndex(t => t.id === idToToggle);
            if (indexToToggle > 0) {
                newState[indexToToggle].myDay = !newState[indexToToggle].myDay;
            }
            break;
        }

    return newState;
}

// Settings reducer
export interface ITodoAppSettings {
    enableMyDay: boolean;
}

const defaultSettings = {
    enableMyDay: true,
} as ITodoAppSettings;

const settingsReducer = (state: ITodoAppSettings = defaultSettings, action: IAction) => {
    let newState: ITodoAppSettings = {...state};
    switch (action.type) {
        case Actions.ToggleMyDay:
            const flag = action.payload as boolean;
            newState.enableMyDay = flag;
            break;
    }

    return newState;
}


// root reducer and store
const rootReducer = combineReducers({todo: todoReducer, settings: settingsReducer});
export const todoStore = createStore(rootReducer, {});
export type ITodoAppStore = ReturnType<typeof rootReducer>;
