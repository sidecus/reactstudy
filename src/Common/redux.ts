import { useCallback } from 'react';
import { Dispatch } from 'redux';

// action type
export interface IAction<T = any> {
    type: string;
    payload: T;
}

// action creator helper
export const createAction = <TActionPayload = undefined>(actionType: string): ((actionPayload?: TActionPayload) => IAction<TActionPayload>) => {
    return (actionPayload?: TActionPayload) => {
        return { type: actionType, payload: actionPayload } as IAction<TActionPayload>;
    };
}

// TODO[sidecus] - proper typing for IActionCreator and IThunkActionCreator args
export type IActionCreator = (...args: any) => IAction;
export type IThunkActionCreator = (...args: any) => Promise<IAction>;

// Helper effect to create a memoized dispatcher callback given a action creator function.
// Supports custom parameter list inferred from the action creator.
// We use the useCallback here - this can help with performance and potentially
// avoid unintentional infinite rerenering.
export const useCallbackDispatcher = <T extends IActionCreator>(dispatch: Dispatch<any>, actionCreator: T): ((...args: Parameters<T>) => any) => {
    const callbackDispatcher = useCallback((...args: Parameters<T>) => {
        return dispatch(actionCreator(...args));
    },
    [dispatch, actionCreator]);

    return callbackDispatcher;
}

// Use call back for simple thunk action dispatcher as well as long as it only depends on the dispatcher and passed in parameters
export const useCallbackThunkDispatcher = <T extends IThunkActionCreator>(dispatch: Dispatch<any>, thunkActionCreator: T): ((...args: Parameters<T>) => any) => {
    const callbackThunkDispatcher = useCallback((...args: Parameters<T>) => dispatch(async () => {
        const actionToDispatch = await thunkActionCreator(...args);
        return dispatch(actionToDispatch);
    }),
    [dispatch, thunkActionCreator]);

    return callbackThunkDispatcher;
}
