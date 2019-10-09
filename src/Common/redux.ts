// action type
export interface IAction<T = any> {
    type: string;
    payload: T;
}

// action creator
export const createAction = <TActionPayload = undefined>(actionType: string): ((actionPayload?: TActionPayload) => IAction<TActionPayload>) => {
    return (actionPayload?: TActionPayload) => {
        return { type: actionType, payload: actionPayload } as IAction<TActionPayload>;
    };
}