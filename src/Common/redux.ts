import { useCallback } from 'react';
import { Action, Dispatch } from 'redux';

/**
 * IAction for all actions with string as type
 * @template TType: action type
 * @template TPayload: payload type
 */
export interface IAction<TType extends string = string, TPayload = undefined> extends Action<TType> {
    payload: TPayload;
}

/**
 * IActionCreator type
 * @template TActionType: action type
 * @template TActionPayload action payload type
 * @param payload action payload
 */
export type ActionCreator<TActionType extends string, TActionPayload = undefined> = (payload: TActionPayload) => IAction<TActionType, TActionPayload>;

/**
 * factory method to help create an action creator
 * @template TActionType: action type
 * @template TActionPayload action payload type
 * @param actionType action type
 */
export const actionCreatorFactory = <TActionType extends string, TActionPayload = undefined>(actionType: TActionType): ActionCreator<TActionType, TActionPayload> => {
    return (actionPayload: TActionPayload) => {
        return { type: actionType, payload: actionPayload } as IAction<TActionType, TActionPayload>;
    };
}

/**
 * Type for action to reducer map.
 * Each action can have an array of reducers handling it.
 * @template TState: state type
 * @template TActionType: action type
 */
export type TActionReducerMap<TState, TActionType extends string> = {
    [actionType in TActionType]?: ((state: TState, action: IAction<actionType, any>) => TState)[];
}

/**
 * Creates a sliced state reducer based on default state and a action to reducer (s) mapping.
 * This avoids the gigantic switch statement most people use.
 * @template TState: state type
 * @template TActionType: action type
 */
export const slicedReducerFactory = <TState, TActionType extends string>(defaultState: TState, map: TActionReducerMap<TState, TActionType>) => {
    return (state: TState = defaultState, action: IAction<TActionType, any>) => {
        let newState = state;
        const reducers = map[action.type];
        if (reducers) {
            reducers.forEach(r => newState = r(newState, action));
        }
        return newState;
    };
}

/**
 * Custom effect to create a memoized dispatcher callback given a action creator function.
 * Supports custom parameter list inferred from the action creator.
 * We use the useCallback here for slight perf gain.
 * @template T action creator type. Note we are not using ActionCreator here since we want to use Rest Parameters
 * for better type extensibility.
 * @param dispatch dispatch object
 * @param actionCreator action creator
 */
export const useCallbackDispatcher = <T extends (...args: any) => IAction<string, any>>(dispatch: Dispatch<any>, actionCreator: T): ((...args: Parameters<T>) => any) => {
    const callbackDispatcher = useCallback((...args: Parameters<T>) => {
        return dispatch(actionCreator(...args));
    },
    [dispatch, actionCreator]);

    return callbackDispatcher;
}

// TODO[sidecus] - proper typing for IActionCreator and IThunkActionCreator args
type IThunkActionCreator = (...args: any) => Promise<IAction<string, any>>;

/**
 * Use call back for simple thunk action dispatcher as well as long as it only depends on the dispatcher and passed in parameters
 * TODO[sidecus] - review this. this is too restrictive.
 * @param dispatch dispatch object
 * @param actionCreator action creator
 */
export const useCallbackThunkDispatcher = <T extends IThunkActionCreator>(dispatch: Dispatch<any>, thunkActionCreator: T): ((...args: Parameters<T>) => any) => {
    const callbackThunkDispatcher = useCallback((...args: Parameters<T>) => dispatch(async () => {
        const actionToDispatch = await thunkActionCreator(...args);
        return dispatch(actionToDispatch);
    }),
    [dispatch, thunkActionCreator]);

    return callbackThunkDispatcher;
}
