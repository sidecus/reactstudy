import { useCallback, useMemo } from 'react';
import { Action, Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

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
export type DispatchableActionCreator = (...args: any) => (IAction<string, any>) | ((dispatch: Dispatch<any>) => any);

/**
 * Custom hooks to create a memoized dispatcher (or bound action creator) given a action creator function.
 * The result dispatcher's parameters are inferred from the input action creator.
 * We use the useCallback here for slight perf gain.
 * @template T: action creator type. This can be a normal action creator, or a thunk action creator.
 * Note we are not using ActionCreator here since we want to use Rest Parameters for better type extensibility.
 * @param dispatch: dispatch object
 * @param actionCreator: action creator - normal action creator or thunk action creator
 */
export const useCallbackDispatcher = <T extends DispatchableActionCreator>(dispatch: Dispatch<any>, actionCreator: T): ((...args: Parameters<T>) => any) => {
    const callbackDispatcher = useCallback((...args: Parameters<T>) => {
        return dispatch(actionCreator(...args));
    },
    [dispatch, actionCreator]);

    return callbackDispatcher;
}

/**
 * A map type (dispatcher name to action creator mapping).
 * @template T: "dispatchers" object shape
 */
export type NamedDispatcherMapObject<T = any> = {
    readonly [K in keyof T]: DispatchableActionCreator;
}

/**
 * named dispatcher type used by useCallbackDispatchers as the return type
 * @template M: DispatcherMapObject
 */
export type NamedDispatchers<M extends NamedDispatcherMapObject = any> = {
    [K in keyof M]: (...args: Parameters<M[K]>) => any;
}

/**
 * Custom hooks to create a list of named dispatchers (bound action creators) in which dispatch is handled automatically.
 * All dispatcher is guarded with useCallback (useCallbackDispatcher above).
 * @param map: dispatcher name to action creator map. IMPORTANT - define the map as a global const. Never pass a function
 * scoped map otherwise it'll defeat the memoization.
 */
export const useNamedDispatchers = <M extends NamedDispatcherMapObject>(map: M): NamedDispatchers<M> => {
    const dispatch = useDispatch();

    // I was using 'useCallback' to memoize each named dispatcher.
    // However it doesn't work anymore once I move the parameters into a 'map' object - we cannot call
    // useCallbackDispatcher on properties of the map since it's not deterministic in React's view.
    // So we are switching to useMemo to memoize the resultNamedDispatchers instead.
    const resultNamedDispatchers = useMemo(() => {
        const result = {} as NamedDispatchers<M>;
        for (const key in map) {
            result[key] = (...args: any) => {
                return dispatch(map[key](...args));
            };
        }
        return result;
    },
    [dispatch, map]);

    return resultNamedDispatchers;
}
