import { useContext, createContext } from "react";

export interface TodosInterface {
  id: number;
  task: string;
  complete: boolean;
}

export interface TodoContextInterface {
  todos: TodosInterface[];
  addTodo: (todo: TodosInterface) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextInterface>({
  todos: [],
  addTodo: () => {},
  completeTodo: () => {},
  deleteTodo: () => {},
});

export function useTodoContext() {
  return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;