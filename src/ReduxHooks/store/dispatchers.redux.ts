import { useDispatch } from 'react-redux';
import { useCallbackDispatcher } from '../../Common/redux';
import { addTodo, removeTodo, toggleCompleted, toggleMyDay, setShowCompletedTodos, setShowMyDayOnlyTodos } from './actions.redux';
import { resetTodos } from './actions.thunk.redux';

/**
 * Custom hooks for dispatchers (bound action creators).
 * You can create one of this for each domain area to logically separte the dispatchers.
 */
export const useDispatchers = () => {
    const dispatch = useDispatch();

    // Use useCallback hooks for all dispatchers. This can boost up performance and avoid infinite rendering.
    // 1. Help with Performance
    //   Value of these dispatchers won't change unless dispatch changes. You can safely pass them to child components.
    //   If you use embed functions for the dispatchers instead, it might cause unnecesary rerendering since a new function object is defined in each render.
    //   Check the examples in childrendering.tsx for more details.
    // 2. Avoid unintentional infinite rendering:
    //   Take dispatchResetTodos as an example, it's called via useEffect to fill in a predefined list of todos.
    //   useEffect is depending on it so you add the dispatcher into its dependency list. And it simply works if we get it via useCallback.
    //   If populateTodos is defined as a function scoped in the parent component and injected as a dependency to useEffect however,  good luck - you have infinite rendering.
    const dispatchAddTodo = useCallbackDispatcher(dispatch, addTodo);
    const dispatchRemoveTodo = useCallbackDispatcher(dispatch, removeTodo);
    const dispatchToggleCompleted = useCallbackDispatcher(dispatch, toggleCompleted);
    const dispatchToggleMyDay = useCallbackDispatcher(dispatch, toggleMyDay);
    const dispatchSetShowCompleted = useCallbackDispatcher(dispatch, setShowCompletedTodos);
    const dispatchSetShowMyDayOnly = useCallbackDispatcher(dispatch, setShowMyDayOnlyTodos);
    const dispatchResetTodos = useCallbackDispatcher(dispatch, resetTodos);

    // return as an object. caller can use object destructuring to pick the dispatchers it needs.
    return {
        dispatchAddTodo,
        dispatchRemoveTodo,
        dispatchToggleCompleted,
        dispatchToggleMyDay,
        dispatchSetShowCompleted,
        dispatchSetShowMyDayOnly,
        dispatchResetTodos,
    };
}