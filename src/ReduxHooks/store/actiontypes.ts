/**
 * Todo app action types
 */
export enum TodoAppActionTypes {
    TODO_ADD = 'AddTodo',
    TODO_AddBatch = 'AddBatchTodos',
    TODO_REMOVE = 'RemoveTodo',
    TODO_REMOVEALL = 'RemoveAll',
    TODO_TOGGLEMYDAY = 'ToggleMyDay',
    TODO_TOGGLECOMPLETED = 'ToggleComplete',
    SETTINGS_SET_SHOWCOMPLETED = 'SetShowCompleted',
    SETTINGS_SET_SHOWMYDAYONLY = 'SetMyDayOnly',
}