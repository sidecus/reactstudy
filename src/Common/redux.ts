import { useCallback } from 'react';
import { Action, Dispatch, Reducer } from 'redux';

/**
 * IAction for all actions with string as type
 * @template TPayload payload type
 */
export interface IAction<TPayload = any> extends Action<string> {
    payload: TPayload;
}

/**
 * IActionCreator type
 * @template TActionPayload action payload type
 * @param payload action payload
 */
export type ActionCreator<TActionPayload = undefined> = (payload: TActionPayload) => IAction<TActionPayload>;

/**
 * factory method to help create an action creator
 * @template TActionPayload action payload type
 * @param actionType action type
 */
export const actionCreatorFactory = <TActionPayload = undefined>(actionType: string): ActionCreator<TActionPayload> => {
    return (actionPayload: TActionPayload) => {
        return { type: actionType, payload: actionPayload } as IAction<TActionPayload>;
    };
}

/**
 * Return type for actionCreatorReducerFactory. This is to make sure action creator defintion are coupled with corresponding reducer
 * @template S state type
 * @template P action payload type
 */
export type ActionCreatorWithReducer<S, P = undefined> = [ActionCreator<P>, Reducer<S, IAction<P>>];

/**
 * Factory method to bulid action creator and corresponding reducer for an action type
 * @template S: state type
 * @template P: action payload type
 * @param actionType: action type
 * @param reducer: reducer function for this action type
 */
export const actionCreatorReducerFactory = <S, P = undefined>(actionType: string, reducer: Reducer<S, IAction<P>>): ActionCreatorWithReducer<S, P> => {
    const actionCreator = actionCreatorFactory<P>(actionType);
    return [actionCreator, reducer];
}

export type CompositReducerWithActionCreators<S> = [Reducer<S, IAction>, ActionCreator]

/**
 * Builder to construct auto reducers and corresponding action creators
 * TODO[sidecus]: not ready - trying to compose composite reducers automatically with Fluent Builder pattern
 * @template S: state type
 */
export class ActionCreatorAndReducerBuilder<S> {
    private readonly actionCreatorWithReducerMap: any = {};

    /**
     * @template P: action payload type
     * @param actionType: action type
     * @param reducer: reducer function for this action type
     */
    public UseActionAndReducer = <P = undefined>(actionType: string, reducer: Reducer<S, IAction<P>>): ActionCreatorAndReducerBuilder<S> => {
        const actionCreatorReducerPair = actionCreatorReducerFactory(actionType, reducer);
        this.actionCreatorWithReducerMap[actionType] = actionCreatorReducerPair;
        return this;
    }
}

/**
 * Helper effect to create a memoized dispatcher callback given a action creator function.
 * Supports custom parameter list inferred from the action creator.
 * We use the useCallback here for slight perf gain.
 * @template T action creator type. Note we are not using ActionCreator here since we want to use Rest Parameters
 * for better type extensibility.
 * @param dispatch dispatch object
 * @param actionCreator action creator
 */
export const useCallbackDispatcher = <T extends (...args: any) => IAction>(dispatch: Dispatch<any>, actionCreator: T): ((...args: Parameters<T>) => any) => {
    const callbackDispatcher = useCallback((...args: Parameters<T>) => {
        return dispatch(actionCreator(...args));
    },
    [dispatch, actionCreator]);

    return callbackDispatcher;
}

// TODO[sidecus] - proper typing for IActionCreator and IThunkActionCreator args
type IThunkActionCreator = (...args: any) => Promise<IAction>;

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
