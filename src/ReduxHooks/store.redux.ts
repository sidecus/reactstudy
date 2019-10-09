import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { IAction, createAction } from '../Common/redux';

export interface ITodo {
    id: number;
    title: string;
    due?: Date;
    myDay: boolean;
    completed: boolean;
}

// Actions and action creators
enum TodoAppActions {
    AddTodo = 'AddTodo',
    AddBatchTodos = 'AddBatchTodos',
    RemoveTodo = 'RemoveTodo',
    RemoveAll = 'RemoveAll',
    ToggleMyDay = 'ToggleMyDay',
    ToggleComplete = 'ToggleComplete',
    SetShowCompleted = 'SetShowCompleted',
    SetMyDayOnly = 'SetMyDayOnly',
}

export const createAddTodoAction = createAction<ITodo>(TodoAppActions.AddTodo);
export const createAddBatchTodosAction = createAction<ITodo[]>(TodoAppActions.AddBatchTodos);
export const createRemoveTodoAction = createAction<number>(TodoAppActions.RemoveTodo);
export const createRemoveAllAction = createAction(TodoAppActions.RemoveAll);
export const createToggleMyDayAction = createAction<number>(TodoAppActions.ToggleMyDay);
export const createToggleCompleteAction = createAction<number>(TodoAppActions.ToggleComplete);
export const createSetShowCompletedAction = createAction<boolean>(TodoAppActions.SetShowCompleted);
export const createSetMyDayOnlyAction = createAction<boolean>(TodoAppActions.SetMyDayOnly);

// todo list reducer
const todoReducer = (state: ITodo[] = [], action: IAction) => {
    let newState: ITodo[] = [...state];
    switch (action.type) {
        case TodoAppActions.AddTodo:
            // assign id for the new todo. if it's the first, set it to 0.
            // otherwise set it to the current max id + 1 to avoid conflicts
            const newId = newState.length > 0 ? (Math.max(...newState.map(t => t.id)) + 1) : 0;
            const newTodo = {id: newId, due: new Date(), myDay: false, completed: false, ...action.payload as ITodo};
            newState.push(newTodo);
            break;
        case TodoAppActions.AddBatchTodos:
            newState = [...action.payload as ITodo[]];
            break;
        case TodoAppActions.RemoveTodo:
            // remove the given todo with the id
            const idToRemove = action.payload as number;
            newState.splice(newState.findIndex(t => t.id === idToRemove), 1);
            break;
        case TodoAppActions.RemoveAll:
            // remove all todos
            newState = [];
            break;
        case TodoAppActions.ToggleMyDay:
            // toggle the myday status for the given todo
            const indexToToggleMyDay = newState.findIndex(t => t.id === action.payload as number);
            if (indexToToggleMyDay >= 0) {
                const todoToggleMyDay = newState[indexToToggleMyDay];
                newState[indexToToggleMyDay] = {...todoToggleMyDay, myDay: !todoToggleMyDay.myDay};
            }
            break;
        case TodoAppActions.ToggleComplete:
            // toggle the complete status for the given todo
            const toggleCompleteIndex = newState.findIndex(t => t.id === action.payload as number);
            if (toggleCompleteIndex >= 0) {
                const todoToggleComplete = newState[toggleCompleteIndex];
                newState[toggleCompleteIndex] = {...todoToggleComplete, completed: !todoToggleComplete.completed};
            }
            break;
        }

    return newState;
}

// Settings reducer
export interface ITodoAppSettings {
    showCompleted: boolean;
    myDayOnly: boolean;
}

const defaultSettings = {
    showCompleted: true,
    myDayOnly: false,
} as ITodoAppSettings;

const settingsReducer = (state: ITodoAppSettings = defaultSettings, action: IAction) => {
    let newState: ITodoAppSettings = {...state};
    switch (action.type) {
        case TodoAppActions.SetShowCompleted:
            newState.showCompleted = action.payload as boolean;
            break;
        case TodoAppActions.SetMyDayOnly:
            newState.myDayOnly = action.payload as boolean;
            break;
        }

    return newState;
}


// root reducer and create store with thunk middleware
const rootReducer = combineReducers({todo: todoReducer, settings: settingsReducer});
export const todoStore = createStore(rootReducer, applyMiddleware(thunk));
export type ITodoAppStore = ReturnType<typeof rootReducer>;