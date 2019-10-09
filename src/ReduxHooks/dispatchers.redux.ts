import { useCallbackDispatcher, useCallbackThunkDispatcher } from '../Common/redux';
import { createAddTodoAction, createRemoveTodoAction, createToggleCompleteAction, createToggleMyDayAction, createSetShowCompletedAction, createSetMyDayOnlyAction, createLoadTodoAction } from './store.redux';
import { useDispatch } from 'react-redux';

// dispatcher custom hooks
// Use useCallback hooks for all dispatchers. This can boost up performance and avoid infinite rendering.
// 1. Help with Performance
//   Value of these dispatchers won't change unless dispatch changes. You can safely pass them to child components.
//   If you use embed functions for the dispatchers instead, it might cause unnecesary rerendering since a new function object is defined in each render.
//   Check the examples in childrendering.tsx for more details.
// 2. Avoid unintentional infinite rendering:
//   Take populateTodos as an example, it's called via useEffect to fill in a predefined list of todos.
//   useEffect is depending on it so you add the dispatcher into its dependency list. And it simply works if we get it via useCallback.
//   If populateTodos is defined as a function scoped in the parent component and injected as a dependency to useEffect however,  good luck - you have infinite rendering.
export const useDispatchers = () => {
    const dispatch = useDispatch();

    const addRandomTodo = useCallbackDispatcher(dispatch, createAddTodoAction);
    const deleteTodo = useCallbackDispatcher(dispatch, createRemoveTodoAction);
    const toggleComplete = useCallbackDispatcher(dispatch, createToggleCompleteAction);
    const toggleMyDay = useCallbackDispatcher(dispatch, createToggleMyDayAction);
    const setShowCompleted = useCallbackDispatcher(dispatch, createSetShowCompletedAction);
    const setShowMyDayOnly = useCallbackDispatcher(dispatch, createSetMyDayOnlyAction);

    // This is a thunk based dispatcher
    const populateTodos = useCallbackThunkDispatcher(dispatch, createLoadTodoAction);

    return { populateTodos, addRandomTodo, deleteTodo, toggleComplete, toggleMyDay, setShowCompleted, setShowMyDayOnly };
}