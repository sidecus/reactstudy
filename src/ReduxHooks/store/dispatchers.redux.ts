import { useCallbackDispatcher, useCallbackThunkDispatcher } from '../../Common/redux';
import { addTodo, removeTodo, toggleCompleted, toggleMyDay, setShowCompletedTodos, setShowMyDayOnlyTodos, createLoadTodoAction } from './actions.redux';
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

    const dispatchAddTodo = useCallbackDispatcher(dispatch, addTodo);
    const dispatchRemoveTodo = useCallbackDispatcher(dispatch, removeTodo);
    const dispatchToggleCompleted = useCallbackDispatcher(dispatch, toggleCompleted);
    const dispatchToggleMyDay = useCallbackDispatcher(dispatch, toggleMyDay);
    const dispatchSetShowCompleted = useCallbackDispatcher(dispatch, setShowCompletedTodos);
    const dispatchSetShowMyDayOnly = useCallbackDispatcher(dispatch, setShowMyDayOnlyTodos);

    // This is a thunk based dispatcher
    const populateTodos = useCallbackThunkDispatcher(dispatch, createLoadTodoAction);

    return { populateTodos, addRandomTodo: dispatchAddTodo, deleteTodo: dispatchRemoveTodo, toggleComplete: dispatchToggleCompleted, toggleMyDay: dispatchToggleMyDay, setShowCompleted: dispatchSetShowCompleted, setShowMyDayOnly: dispatchSetShowMyDayOnly };
}