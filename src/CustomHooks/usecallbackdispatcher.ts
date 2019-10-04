import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Helper effect to create a memoized dispatcher callback given a action creator function.
// Supports custom parameter list inferred from the action creator.
// We use the useCallback here - this can help with performance and potentially
// avoid unintentional infinite rerenering.
export const useCallbackDispatcher = <T extends (...args: any) => any>(actionCreator: T): ((...args: Parameters<T>) => any) => {
    const dispatch = useDispatch();

    const callbackDispatcher = useCallback((...args: Parameters<T>) => {
        return dispatch(actionCreator(...args));
    },
    [dispatch, actionCreator]);

    return callbackDispatcher;
}
