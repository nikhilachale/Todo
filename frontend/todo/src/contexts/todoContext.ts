import { useContext, createContext } from "react";

export interface TodosInterface {
  tid:number;
  id: string;
  task: string;
  complete: boolean;
}

export interface TodoContextInterface {


  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextInterface>({


  completeTodo: () => {},
  deleteTodo: () => {},
});

export function useTodoContext() {
  return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;