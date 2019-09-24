import { useDispatch } from "react-redux";
import { createAddBatchTodosAction, createAddTodoAction, createRemoveTodoAction, createToggleCompleteAction, createToggleMyDayAction, createSetShowCompletedAction, createSetMyDayOnlyAction, ITodo } from "./store.redux";
import { useCallback } from "react";

// dispatchers
export const useDispatchers = () => {
    const dispatch = useDispatch();

    // Populate with predefined todos. We use the useCallbacl here to follow hooks dependency rules and 
    // avoid infinite rerenering.
    // We usually need to specify this as part of the useEffect dependencies.
    // If we don't define this as callback and define this in the function component directly,
    // then a new function is created during each render.
    // In that case, the useEffect will be run forever.
    // Furthermore, this can also help improve performance.
    const populateTodos = useCallback((todos: ITodo[]) => {
        dispatch(createAddBatchTodosAction(todos));
    }, [dispatch]);

    // Note we are not using "useCallback" here, since this won't cause the above issue and we want a new due date.
    const addRandomTodo = useCallback((todo: ITodo) => {
        dispatch(createAddTodoAction(todo));
    }, [dispatch]);

    const deleteTodo = useCallback((id: number) => {
        dispatch(createRemoveTodoAction(id));
    }, [dispatch]);;

    const toggleComplete = useCallback((id: number) => {
        dispatch(createToggleCompleteAction(id));
    }, [dispatch]);

    const toggleMyDay = useCallback((id: number) => {
        dispatch(createToggleMyDayAction(id));
    }, [dispatch]);

    const setShowCompleted = useCallback((showCompleted: boolean) => {
        dispatch(createSetShowCompletedAction(showCompleted));
    }, [dispatch]);

    const setShowMyDayOnly = useCallback((myDayOnly: boolean) => {
        dispatch(createSetMyDayOnlyAction(myDayOnly));
    }, [dispatch]);

    return { populateTodos, addRandomTodo, deleteTodo, toggleComplete, toggleMyDay, setShowCompleted, setShowMyDayOnly };
}