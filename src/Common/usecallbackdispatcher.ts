import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { IAction } from './redux';

// Helper effect to create a memoized dispatcher callback given a action creator function.
// Supports custom parameter list inferred from the action creator.
// We use the useCallback here - this can help with performance and potentially
// avoid unintentional infinite rerenering.
type IActionCreator = (...args: any) => IAction;
export const useCallbackDispatcher = <T extends IActionCreator>(actionCreator: T): ((...args: Parameters<T>) => any) => {
    const dispatch = useDispatch();

    const callbackDispatcher = useCallback((...args: Parameters<T>) => {
        return dispatch(actionCreator(...args));
    },
    [dispatch, actionCreator]);

    return callbackDispatcher;
}

// Don't memoize for thunk actions - it might change depending on the parameter (it returns a function having a dispatch parameter, but in that function it can rely on parameters via closures);
type IThunkAction = (dispatch: Dispatch<any>) => any;
type IThunkActionCreator = (...args: any) => IThunkAction;
export const useThunkDispatcher = <T extends IThunkActionCreator>(thunkActionCreator: T): ((...args: Parameters<T>) => any) => {
    const dispatch = useDispatch();
    return (...args: Parameters<T>) => dispatch(thunkActionCreator(...args));
}