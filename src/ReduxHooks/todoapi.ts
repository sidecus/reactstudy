import { ITodo } from "./store.redux";

// Sample todo loading from api
export const loadTodos = async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/todos.json`);
    return await response.json() as ITodo[];
}