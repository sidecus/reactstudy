import { ITodo } from './store.redux';

export const predefinedTodos = [
    { id: 0, title: 'eat breakfast', myDay: true, due: new Date().setHours(7), completed: false },
    { id: 1, title: 'drive to work', myDay: true, due: new Date().setHours(8), completed: true },
    { id: 3, title: 'planning',      myDay: true, due: new Date().setHours(8), completed: true },
    { id: 4, title: 'have lunch',    myDay: true, due: new Date().setHours(12), completed: false },
    { id: 5, title: 'meeting',       myDay: true, due: new Date().setHours(15), completed: false },
    { id: 6, title: 'dinner',        myDay: true, due: new Date().setHours(19), completed: false },
    { id: 7, title: 'go home',       myDay: false, due: new Date().setHours(20), completed: false },
    { id: 8, title: 'glue broken heart',    myDay: false, due: new Date().setHours(23), completed: false },
    { id: 2, title: 'coding',        myDay: true, due: new Date().setHours(23), completed: true },
    { id: 9, title: 'heaven or hell',       myDay: false, completed: false },
] as ITodo[];