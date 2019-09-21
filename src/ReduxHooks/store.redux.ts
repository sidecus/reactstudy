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

export interface ITodo {
    id: number;
    title: string;
    due: Date;
}

// dispatchers
export const createAddTodoAction = (todo: ITodo) => {
    return { type: Actions.AddTodo, payload: todo } as IAction<ITodo>;
}

export const createRemoveTodoAction = (id: number) => {
    return { type: Actions.AddTodo, payload: id } as IAction<number>;
}

// reducers
const todoReducer = (store: ITodo[] = [], action: IAction) => {
    let newStore: ITodo[] = [...store];
    switch (action.type) {
        case Actions.AddTodo:
            let newId = 0;
            if (newStore.length > 0) {
                newId = Math.max(...newStore.map(t => t.id)) + 1;
            }
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
export type ITodoAppStore = ReturnType<typeof rootReducer>;
