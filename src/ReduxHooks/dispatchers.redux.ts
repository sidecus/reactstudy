import { useCallbackDispatcher } from '../CustomHooks/usecallbackdispatcher';
import { createAddBatchTodosAction, createAddTodoAction, createRemoveTodoAction, createToggleCompleteAction, createToggleMyDayAction, createSetShowCompletedAction, createSetMyDayOnlyAction } from './store.redux';

// dispatcher custom hooks
// Use useCallback hooks for all dispatchers. This can boost up performance and avoid infinite rendering.
// 1. Help with Performance
//   Value of these dispatches won't change unless dispatch changes. You can safely pass them to child components.
//   If you use embed functions intead, it might cause unnecesary rerendering since a new function object is defined in each render.
//   Check the examples in childrendering.tsx for more details.
// 2. Avoid unintentional infinite rendering:
//   Take populateTodos as an example, it's called via useEffect to fill in a predefined list of todos.
//   useEffect is depending on it so you add the dispatcher into its dependency list. And it simply works if we get it via useCallback.
//   If populateTodos is defined as a function scoped in the parent component and injected as a dependency to useEffect however,  good luck - you have infinite rendering.
export const useDispatchers = () => {

    const populateTodos = useCallbackDispatcher(createAddBatchTodosAction);
    const addRandomTodo = useCallbackDispatcher(createAddTodoAction);
    const deleteTodo = useCallbackDispatcher(createRemoveTodoAction);
    const toggleComplete = useCallbackDispatcher(createToggleCompleteAction);
    const toggleMyDay = useCallbackDispatcher(createToggleMyDayAction);
    const setShowCompleted = useCallbackDispatcher(createSetShowCompletedAction);
    const setShowMyDayOnly = useCallbackDispatcher(createSetMyDayOnlyAction);

    return { populateTodos, addRandomTodo, deleteTodo, toggleComplete, toggleMyDay, setShowCompleted, setShowMyDayOnly };
}