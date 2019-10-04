import { useDispatch } from "react-redux";
import { createAddBatchTodosAction, createAddTodoAction, createRemoveTodoAction, createToggleCompleteAction, createToggleMyDayAction, createSetShowCompletedAction, createSetMyDayOnlyAction, ITodo } from "./store.redux";
import { useCallback } from "react";

// dispatchers
// Use useCallback hooks for all dispatchers. This can boost up performance and avoid infinite rendering.
// 1. Help with Performance
//   Value of these dispatches won't change unless dispatch changes. You can safely pass them to child components.
//   If you use embed functions intead, it might cause unnecesary rerendering since a new function object is defined in each render.
//   Check the examples in FunctionVSClass for more details.
// 2. Avoid unintentional infinite rendering:
//   Take populateTodos as an example, it's called via useEffect to fill in a predefined list of todos.
//   useEffect is depending on it so you add the dispatcher into its dependency list. And it just works.
//   If populateTodos is defined as a function scoped in the parent component and injected as a dependency to useEffect - good luck - you have infinite rendering.
export const useDispatchers = () => {
    const dispatch = useDispatch();

    // Populate with predefined todos. We use the useCallback here to follow hooks dependency rules and 
    // avoid infinite rerenering. We usually specify this as part of the useEffect dependencies.
    // If we don't define this as callback but instead just an embeded function, the useEffect will trigger infinite rendering.
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