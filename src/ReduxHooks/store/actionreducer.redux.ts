import { actionCreatorReducerFactory } from '../../Common/redux';
import { loadTodos } from '../api/todoapi';
import { ITodo, ITodoAppSettings } from './store.redux';
import { TodoAppActionTypes } from './actiontypes';

/* TODOs action creators and reducers */

/**
 * AddTodo action creator and corresponding reducer
 */
export const [createAddTodoAction, addTodoReducer] = actionCreatorReducerFactory<ITodo[], ITodo>(
    TodoAppActionTypes.TODO_ADD,
    (state, action) => {
        // assign id for the new todo. if it's the first, set it to 0.
        // otherwise set it to the current max id + 1 to avoid conflicts
        const oldState = state!;
        const newId = oldState.length > 0 ? (Math.max(...oldState.map(t => t.id)) + 1) : 0;
        const newTodo = {id: newId, due: new Date(), myDay: false, completed: false, ...action.payload};
        newTodo.title = `${newTodo.title} ${newTodo.id}`;
        return [...oldState, newTodo];
    }
);

/**
 * AddBatchTodo action creator and reducer
 */
export const [createAddBatchTodosAction, addBatchTodoReducer] = actionCreatorReducerFactory<ITodo[], ITodo[]>(
    TodoAppActionTypes.TODO_AddBatch,
    (state, action) => {
        return [...action.payload];
    }
);

/**
 * RemoveTodo action creator and reducer
 */
export const [createRemoveTodoAction, removeTodoReducer] = actionCreatorReducerFactory<ITodo[], number>(
    TodoAppActionTypes.TODO_REMOVEALL,
    (state, action) => {
        // remove the given todo with the id
        const newState = [...state!];
        newState.splice(newState.findIndex(t => t.id === action.payload), 1);
        return newState;
    }
)

/**
 * RemoveAll action creator and reducer
 */
export const [createRemoveAllAction, removeAllReducer] = actionCreatorReducerFactory<ITodo[]>(
    TodoAppActionTypes.TODO_REMOVEALL,
    (state, action) => {
        return [];
    }
);

/**
 * ToggleMyDay action creator and reducer
 */
export const [createToggleMyDayAction, toggleMyDayReducer] = actionCreatorReducerFactory<ITodo[], number>(
    TodoAppActionTypes.TODO_TOGGLEMYDAY,
    (state, action) => {
        const oldState = state!;
        // toggle the myday status for the given todo if exists
        const index = oldState.findIndex(t => t.id === action.payload);
        if (index >= 0) {
            const todo = oldState[index];
            const newState = [...oldState];
            newState[index] = {...todo, myDay: !todo.myDay};
            return newState;
        }
        return oldState;
    }
);

/**
 * ToggleCompleted action creator and reducer
 */
export const [createToggleCompletedAction, toggleCompletedReducer] = actionCreatorReducerFactory<ITodo[], number>(
    TodoAppActionTypes.TODO_TOGGLECOMPLETED,
    (state, action) => {
        const oldState = state!;
        // toggle the complete status for the given todo (if exists)
        const index = oldState.findIndex(t => t.id === action.payload);
        if (index >= 0) {
            const todo = oldState[index];
            const newState = [...oldState];
            newState[index] = {...todo, completed: !todo.completed};
            return newState;
        }
        return oldState;
    }
);

/* Settings action creators and reducers */

/**
 * ShowCompleted settings action creator and reducer
 */
export const [createSetShowCompletedAction, setShowCompletedReducer] = actionCreatorReducerFactory<ITodoAppSettings, boolean>(
    TodoAppActionTypes.SETTINGS_SET_SHOWCOMPLETED,
    (state, action) => {
        return {...state!, showCompleted: action.payload};
    }
);

/**
 * SetMyDayOnly action creator and reducer
 */
export const [createSetMyDayOnlyAction, setMyDayOnlyReducer] = actionCreatorReducerFactory<ITodoAppSettings, boolean>(
    TodoAppActionTypes.SETTINGS_SET_SHOWMYDAYONLY,
    (state, action) => {
        return {...state!, myDayOnly: action.payload};
    }
);

/**
 * This is the thunk to dispatch to load predefined todos
 * TODO[sidecus] - review, convenient for simple scenarios like this but too restrictive
 * @param param unused param just to test the call back behavior.
 */
export const createLoadTodoAction = async (param: number) => {
    const todos = await loadTodos();
    return createAddBatchTodosAction(todos);
}

