import { actionCreatorFactory, IAction, slicedReducerFactory, TActionReducerMap, namedDispatchersFactory } from './reduxextensions';
import { AnyAction, Dispatch, Action } from 'redux';
import { ListItemSecondaryAction } from '@material-ui/core';

it('actionCreatorFactory creates proper action creators', () => {
    // Only positive flow. No test with wrong parameter to actionCreatorFactory or the action creator since those have type guards (compilation errors).

    // number as payload
    const numberActionType = 'number action';
    const numberActionCreator = actionCreatorFactory<typeof numberActionType, number>(numberActionType);
    const numberAction = numberActionCreator(3);
    expect(numberAction.payload).toBe(3);
    expect(numberAction.type).toBe(numberActionType);

    // no payload
    const noPayloadActionType = 'nopayload action';
    const noPayloadActionCreator = actionCreatorFactory<typeof noPayloadActionType>(noPayloadActionType);
    const noPayloadAction = noPayloadActionCreator();
    expect(noPayloadAction.type).toBe(noPayloadActionType);
});

interface State {
    numberField: number,
    numberField2: number,
    stringField: string,
};

it('slicedReducerFactory creates correct sliced state reducer for one action to be processed by multiple reducer', () => {
    // We are always operating on the same state object so that
    const numberReducer = (s: State, action: IAction<string>) => {
        s.numberField = s.numberField + 1;
        return s;
    }

    const numberReducer2 = (s: State, action: IAction<string>) => {
        s.numberField2 = s.numberField2 + 1;
        return s;
    }

    const stringReducer = (s: State, action: IAction<string, string>) => {
        s.stringField = action.payload;
        return s;
    }

    const reducerMap: TActionReducerMap<State, string> = {
        ['addnumber']: [numberReducer, numberReducer2],     // one action two reducers
        ['setstring']: [stringReducer],                     // single reducer for the string action
    }

    const state = { numberField: 0, numberField2: 0, stringField: '', };
    const slicedReducer = slicedReducerFactory(state, reducerMap);

    // first reducer should update both numberField and numberField2
    slicedReducer(state, { type: 'addnumber' } as IAction<string>);
    expect(state.numberField).toBe(1);
    expect(state.numberField2).toBe(1);
    expect(state.stringField).toBe('');

    // should update both numberField and numberField2 again, and no change to stringField
    slicedReducer(state, { type: 'addnumber' } as IAction<string>);
    expect(state.numberField).toBe(2);
    expect(state.numberField2).toBe(2);
    expect(state.stringField).toBe('');

    // should only update stringField
    slicedReducer(state, { type: 'setstring', payload: 'newstring'} as IAction<string, string>);
    expect(state.numberField).toBe(2);
    expect(state.numberField2).toBe(2);
    expect(state.stringField).toBe('newstring');
});

// TODO[sidecus] - switch to redux-mock-store
const dispatchMock: Dispatch<IAction<string, any>> = <T extends IAction<string, any>>(action: T) => action;

it('dispatcherMapFactory constructs correct map', () => {
    const result = namedDispatchersFactory(dispatchMock, {
        setNumber: (p: number) => { return {type: 'setNumber', payload: p}; },
        setString: (p: string) => { return {type: 'setString', payload: p}; },
        noPayload: () => { return {type: 'noPayload'} as IAction<string, any>; },
    });

    expect(result.setNumber(3)).toEqual({type: 'setNumber', payload: 3});
    expect(result.setString('random')).toEqual({type: 'setString', payload: 'random'});
    expect(result.noPayload()).toEqual({type: 'noPayload', payload: undefined});
});