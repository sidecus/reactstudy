import { createStore, combineReducers } from 'redux';

enum Actions {
    AddTodo = "AddTodo",
    RemoveTodo = "RemoveTodo",
    AddToMyDay = "AddToMyDay",
    RemoveFromMyDay = "RemoveFromMyDay",
    ToggleMyDay = "ToggleMyDay",
}

interface IAction<T = any> {
    type: Actions;
    payload?: T;
}

export interface ITodo {
    id: number;
    title: string;
    due: Date;
    inMyDay: boolean;
}

// dispatchers
export const createAddTodoAction = (todo: ITodo) => {
    return { type: Actions.AddTodo, payload: todo } as IAction<ITodo>;
}

export const createRemoveTodoAction = (id: number) => {
    return { type: Actions.AddTodo, payload: id } as IAction<number>;
}

// reducers
const todoReducer = (state: ITodo[] = [], action: IAction) => {
    let newState: ITodo[] = [...state];
    switch (action.type) {
        case Actions.AddTodo:
            let newId = 0;
            if (newState.length > 0) {
                newId = Math.max(...newState.map(t => t.id)) + 1;
            }
            const newTodo = {...action.payload as ITodo, id: newId};
            newState.push(newTodo);
            break;
        case Actions.RemoveTodo:
            const idToRemove = action.payload as number;
            newState.splice(newState.findIndex(t => t.id === idToRemove), 1);
            break;
        case Actions.AddToMyDay:
            const idToAddToMyDay = action.payload as number;
            const todoIndexToAddToMyDay = newState.findIndex(t => t.id === idToAddToMyDay);
            if (todoIndexToAddToMyDay > 0) {
                newState[todoIndexToAddToMyDay].inMyDay = true;
            }
            break;
        }

    return newState;
}

// Settings state
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
