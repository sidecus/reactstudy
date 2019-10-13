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
 * Normal action creator type.
 * @template TActionType: action type
 * @template TActionPayload action payload type
 * @param payload action payload
 */
type ActionCreator<TActionType extends string, TActionPayload = undefined> = (payload: TActionPayload) => IAction<TActionType, TActionPayload>;

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
 * Type for action to reducer(s) mapping.
 * Each action can have one or more reducers handling it.
 * @template TState: state type
 * @template TActionType: action type (string/string enum)
 */
export type TActionReducerMap<TState, TActionType extends string> = {
    readonly [actionType in TActionType]?: ((state: TState, action: IAction<actionType, any>) => TState)[];
}

/**
 * Creates a sliced state reducer based on default state and a action to reducer(s) mapping.
 * This avoids the gigantic switch statement most people use.
 * @template TState: state type
 * @template TActionType: action type
 * @param defaultState: default value used to initialize the state
 * @param actionReducerMap: action to reducer(s) map on the current slice of state
 */
export const slicedReducerFactory = <TState, TActionType extends string>(
    defaultState: TState,
    actionReducerMap: TActionReducerMap<TState, TActionType>) => {
    return (state: TState = defaultState, action: IAction<TActionType, any>) => {
        let newState = state;
        const reducers = actionReducerMap[action.type];
        if (reducers) {
            reducers.forEach(r => newState = r(newState, action));
        }
        return newState;
    };
}

/**
 * Type for a dispatchable action creator (action creator or thunk action creator)
 */
type DispatchableActionCreatorType = (...args: any) => (IAction<string, any>) | ((dispatch: Dispatch<any>) => any);

/**
 * Custom hooks to create a memoized dispatcher (or bound action creator) given a action creator function.
 * The result dispatcher's parameters are inferred from the input action creator.
 * We use the useCallback here for slight perf gain.
 * @template T: action creator type. This can be a normal action creator, or a thunk action creator.
 * Note we are not using ActionCreator here since we want to use Rest Parameters for better type extensibility.
 * @param dispatch: dispatch object
 * @param actionCreator: action creator - normal action creator or thunk action creator
 */
export const useCallbackDispatcher = <T extends DispatchableActionCreatorType>(dispatch: Dispatch<any>, actionCreator: T): ((...args: Parameters<T>) => any) => {
    const callbackDispatcher = useCallback((...args: Parameters<T>) => {
        return dispatch(actionCreator(...args));
    },
    [dispatch, actionCreator]);

    return callbackDispatcher;
}