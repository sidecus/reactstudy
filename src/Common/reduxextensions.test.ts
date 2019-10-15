import { Dispatch, combineReducers } from 'redux';
import { actionCreatorFactory, IAction, slicedReducerFactory, TActionReducerMap, namedDispatchersFactory } from './reduxextensions';

describe('redux extensions basic', () => {
    test('actionCreatorFactory creates proper action creators', () => {
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

    test('slicedReducerFactory creates correct sliced state reducer', () => {
        const numberReducer = (s: State, action: IAction<string>) => {
            s.numberField = s.numberField + 1;
            return {...s};
        }

        const numberReducer2 = (s: State, action: IAction<string>) => {
            s.numberField2 = s.numberField2 + 1;
            return {...s};
        }

        const stringReducer = (s: State, action: IAction<string, string>) => {
            s.stringField = action.payload;
            return {...s};
        }

        const reducerMap: TActionReducerMap<State, string> = {
            ['addnumber']: [numberReducer, numberReducer2],     // one action two reducers
            ['setstring']: [stringReducer],                     // single reducer for the string action
        }

        let state = { numberField: 0, numberField2: 0, stringField: '', };
        const slicedReducer = slicedReducerFactory(state, reducerMap);

        // first reducer should update both numberField and numberField2
        state = slicedReducer(state, { type: 'addnumber' } as IAction<string>);
        expect(state.numberField).toBe(1);
        expect(state.numberField2).toBe(1);
        expect(state.stringField).toBe('');

        // should update both numberField and numberField2 again, and no change to stringField
        state = slicedReducer(state, { type: 'addnumber' } as IAction<string>);
        expect(state.numberField).toBe(2);
        expect(state.numberField2).toBe(2);
        expect(state.stringField).toBe('');

        // should only update stringField
        state = slicedReducer(state, { type: 'setstring', payload: 'newstring'} as IAction<string, string>);
        expect(state.numberField).toBe(2);
        expect(state.numberField2).toBe(2);
        expect(state.stringField).toBe('newstring');
    });

    // TODO[sidecus] - switch to redux-mock-store
    const dispatchMock: Dispatch<IAction<string, any>> = <T extends IAction<string, any>>(action: T) => action;

    test('dispatcherMapFactory constructs correct named dispatcher map', () => {
        const result = namedDispatchersFactory(dispatchMock, {
            setNumber: (p: number) => { return {type: 'setNumber', payload: p}; },
            setString: (p: string) => { return {type: 'setString', payload: p}; },
            noPayload: () => { return {type: 'noPayload'} as IAction<string, any>; },
        });

        expect(result.setNumber(3)).toEqual({type: 'setNumber', payload: 3});
        expect(result.setString('random')).toEqual({type: 'setString', payload: 'random'});
        expect(result.noPayload()).toEqual({type: 'noPayload', payload: undefined});
    });
});

describe('redux extension complex scenario', () => {
    interface IHead {
        hasHeadache: boolean;
    }

    interface IBody {
        hasMusclePain: boolean;
        bodyMassIndex: number;
    }

    enum Activity
    {
        Workout = 'work_out',
        Sleep = 'sleep',
        SeeDoctor = 'see doctor',
    }

    // action creators
    const workOutActionCreator = actionCreatorFactory<Activity.Workout, number>(Activity.Workout);
    const sleepActionCreator = actionCreatorFactory<Activity.Sleep, number>(Activity.Sleep);
    const seeDoctorActionCreator = actionCreatorFactory<Activity.SeeDoctor>(Activity.SeeDoctor);

    const headacheReducer = (state: IHead, action: ReturnType<typeof sleepActionCreator> | ReturnType<typeof seeDoctorActionCreator> | ReturnType<typeof workOutActionCreator>) => {
        let hasHeadache = state.hasHeadache;
        if (action.type === Activity.Sleep) {
            if (action.payload >= 8) {
                // Sleeping more than 8 hours cures headache
                hasHeadache = false;
            }
        } else if (action.type === Activity.SeeDoctor) {
            // seeing doctor cures headache
            hasHeadache = false;
        } else if (action.type === Activity.Workout) {
            if (action.payload >= 5) {
                // you worked out too much, now you have headache
                hasHeadache = true;
            }
        }

        return {...state, hasHeadache };
    };

    const musclePainReducer = (state: IBody, action: ReturnType<typeof workOutActionCreator> | ReturnType<typeof seeDoctorActionCreator>) => {
        let hasMusclePain = state.hasMusclePain;
        if (action.type === Activity.Workout) {
            const hours = action.payload as number;
            if (hours >= 5) {
                // Working out too much develops muscle pain
                hasMusclePain = true;
            }
        } else if (action.type === Activity.SeeDoctor) {
            // seeing doctor cures muscle pain
            hasMusclePain = false;
        }

        return {...state, hasMusclePain } as IBody;
    }

    const bodyMassIndexReducer = (state: IBody, action: ReturnType<typeof workOutActionCreator>) => {
        if (action.payload >= 1 && action.payload <= 2) {
            // right amount of exercise improves body mass index
            return {...state, bodyMassIndex: state.bodyMassIndex - 0.1};
        }

        return state;
    }

    // setup overall reducer
    const DefaultHead = { hasHeadache: false };
    const DefaultBody = { hasMusclePain: false, bodyMassIndex: 25 };
    const slicedHeadReducer = slicedReducerFactory<IHead, Activity.Sleep | Activity.SeeDoctor | Activity.Workout>(DefaultHead, {
        [Activity.Sleep]: [headacheReducer],
        [Activity.SeeDoctor]: [headacheReducer],
        [Activity.Workout]: [headacheReducer],
    });
    const slicedBodyReducer = slicedReducerFactory<IBody, Activity.Workout | Activity.SeeDoctor>(DefaultBody, {
        [Activity.Workout]: [musclePainReducer, bodyMassIndexReducer],
        [Activity.SeeDoctor]: [musclePainReducer],
    });
    const rootReducer = combineReducers({ head: slicedHeadReducer, body: slicedBodyReducer });
    const defaultState = { head: DefaultHead, body: DefaultBody };

    test('work out properly reduces BMI', () => {
        let state = defaultState;
        state = rootReducer(state, workOutActionCreator(1.5));
        expect(state.body.hasMusclePain).toBe(false);
        expect(state.body.bodyMassIndex).toBeCloseTo(defaultState.body.bodyMassIndex - 0.1, 5);
        expect(state.head.hasHeadache).toBe(false);
    });

    test('work out too much and you have to see a doctor', () => {
        let state = defaultState;
        // work out way too much gives you muscle pain and headache
        state = rootReducer(state, workOutActionCreator(8));
        expect(state.body.hasMusclePain).toBe(true);
        expect(state.body.bodyMassIndex).toBeCloseTo(defaultState.body.bodyMassIndex, 5);
        expect(state.head.hasHeadache).toBe(true);

        // sleep/rest but it only cures the headache
        state = rootReducer(state, sleepActionCreator(8));
        expect(state.body.hasMusclePain).toBe(true);
        expect(state.body.bodyMassIndex).toBeCloseTo(defaultState.body.bodyMassIndex, 5);
        expect(state.head.hasHeadache).toBe(false);

        // you go see a doctor, now you are back to normal
        state = rootReducer(state, seeDoctorActionCreator());
        expect(state.body.hasMusclePain).toBe(false);
        expect(state.body.bodyMassIndex).toBeCloseTo(defaultState.body.bodyMassIndex, 5);
        expect(state.head.hasHeadache).toBe(false);
    });
});