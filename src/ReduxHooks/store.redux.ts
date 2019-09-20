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

// dispatchers
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

// reducers
const todoReducer = (store: ITodo[] = [], action: IAction) => {
    let newStore: ITodo[] = [...store];
    switch (action.type) {
        case Actions.AddTodo:
            const newId = Math.max(...newStore.map(t => t.id));
            const newTodo = {...action.payload as ITodo, id: newId};
            newStore.push(newTodo);
            break;
        case Actions.RemoveTodo:
            const id = action.payload as number;
            newStore.splice(newStore.findIndex(t => t.id === id), 1);
            break;
    }

    return newStore;
}

const mydayReducer = (store: ITodo[] = [], action: IAction) => {
    let newStore: ITodo[] = [...store];
    switch (action.type) {
        case Actions.AddToMyDay:
            const newId = Math.max(...newStore.map(t => t.id));
            const newTodo = {...action.payload as ITodo, id: newId};
            newStore.push(newTodo);
            break;
        case Actions.RemoveTodo:
            const id = action.payload as number;
            newStore.splice(newStore.findIndex(t => t.id === id), 1);
            break;
    }

    return newStore;
}

const rootReducer = combineReducers({todo: todoReducer, myday: mydayReducer});

// store
export const todoStore = createStore(rootReducer, {});
export type ITodoAppStore = typeof todoStore;

// selectors
export const todoSelector = (store: ITodoAppStore) => store.getState().todo;
export const myDaySelector = (store: ITodoAppStore) => store.getState().myday;