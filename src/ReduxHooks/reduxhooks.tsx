import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ITodo, createAddTodoAction } from './store.redux';
import { todoSelector } from './selectors.redux';

export const ReduxHooks = () => {
    const todos = useSelector(todoSelector);
    const dispatch = useDispatch();

    const addTodo = () => {
        dispatch(createAddTodoAction({title: "todo1", due: new Date()} as ITodo));
    }

    return  (
        <>
            <div>Number of ToDos: {todos.length}</div>
            <button onClick={() => addTodo()}>Add Todo</button>
        </>
    );
};