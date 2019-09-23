import { createStore, combineReducers } from 'redux';

export interface ITodo {
    id: number;
    title: string;
    due: Date;
    myDay: boolean;
    complete: boolean;
}

// Actions and action creators
enum Actions {
    AddTodo = "AddTodo",
    RemoveTodo = "RemoveTodo",
    ToggleMyDay = "ToggleMyDay",
    ToggleComplete = "ToggleComplete",
    SetShowCompleted = "SetShowCompleted",
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

export const createToggleMyDayAction = (id: number) => {
    return { type: Actions.ToggleMyDay, payload: id } as IAction<number>;
}

export const createToggleCompleteAction = (id: number) => {
    return { type: Actions.ToggleComplete, payload: id } as IAction<number>;
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
            const indexToToggleMyDay = newState.findIndex(t => t.id === action.payload as number);
            if (indexToToggleMyDay >= 0) {
                const todoToggleMyDay = newState[indexToToggleMyDay];
                newState[indexToToggleMyDay] = {...todoToggleMyDay, myDay: !todoToggleMyDay.myDay};
            }
            break;
        case Actions.ToggleComplete:
            // toggle the complete status for the given todo
            const toggleCompleteIndex = newState.findIndex(t => t.id === action.payload as number);
            if (toggleCompleteIndex >= 0) {
                const todoToggleComplete = newState[toggleCompleteIndex];
                newState[toggleCompleteIndex] = {...todoToggleComplete, complete: !todoToggleComplete.complete};
            }
            break;
        }

    return newState;
}

// Settings reducer
export interface ITodoAppSettings {
    showCompleted: boolean;
}

const defaultSettings = {
    showCompleted: true,
} as ITodoAppSettings;

const settingsReducer = (state: ITodoAppSettings = defaultSettings, action: IAction) => {
    let newState: ITodoAppSettings = {...state};
    switch (action.type) {
        case Actions.SetShowCompleted:
            const flag = action.payload as boolean;
            newState.showCompleted = flag;
            break;
    }

    return newState;
}


// root reducer and store
const rootReducer = combineReducers({todo: todoReducer, settings: settingsReducer});
export const todoStore = createStore(rootReducer, {});
export type ITodoAppStore = ReturnType<typeof rootReducer>;
