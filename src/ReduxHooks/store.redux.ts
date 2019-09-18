import { createStore, combineReducers, Dispatch } from 'redux';

enum Actions {
    AddTodo = "AddTodo",
    RemoveTodo = "RemoveTodo",
    AddToMyDay = "AddToMyDay",
    RemoveFromMyDay = "RemoveFromMyDay",
}

interface IAction<T = any> {
    type: Actions;
    payload?: T;
}

interface ITodo {
    id: number;
    title: string;
    Due: Date;
}

interface ITodoStore {
    todos: ITodo[];
}

export const dispatchAddTodo = (todo: ITodo) => {
    return (dispatch: Dispatch<IAction>) => {
        const action = { type: Actions.AddTodo, payload: todo } as IAction<ITodo>;
        dispatch(action);
    }
}

export const dispatchRemoveTodo = (id: number) => {
    return (dispatch: Dispatch<IAction>) => {
        const action = { type: Actions.AddTodo, payload: id } as IAction<number>;
        dispatch(action);
    }
}

const todoReducer = (store: ITodoStore = {todos: []}, action: IAction) => {
    let newStore: ITodoStore = {...store};
    switch (action.type) {
        case Actions.AddTodo:
            const newId = Math.max(...newStore.todos.map(t => t.id));
            const newTodo = {...action.payload as ITodo, id: newId};
            newStore.todos.push(newTodo);
            break;
        case Actions.RemoveTodo:
            const id = action.payload as number;
            newStore.todos.splice(newStore.todos.findIndex(t => t.id === id), 1);
            break;
    }

    return newStore;
}

const mydayReducer = (store: ITodoStore = {todos: []}, action: IAction) => {
    let newStore: ITodoStore = {...store};
    switch (action.type) {
        case Actions.AddToMyDay:
            const newId = Math.max(...newStore.todos.map(t => t.id));
            const newTodo = {...action.payload as ITodo, id: newId};
            newStore.todos.push(newTodo);
            break;
        case Actions.RemoveTodo:
            const id = action.payload as number;
            newStore.todos.splice(newStore.todos.findIndex(t => t.id === id), 1);
            break;
    }

    return newStore;
}

const rootReducer = combineReducers({todo: todoReducer, myday: mydayReducer});
export const todoStore = createStore(rootReducer);
export type ITodoAppStore = typeof todoStore; 