import { ITodo } from "../store/store.redux";

// Sample todo loading from api
export const loadTodos = async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/todos.json`);
    const jsonResponse = await response.json();

    // enforcing contract here
    return {
        showMyDayOnly: jsonResponse.showMyDayOnly as boolean,
        showCompleted: jsonResponse.showCompleted as boolean,
        todos: jsonResponse.todos as ITodo[],
    };
}