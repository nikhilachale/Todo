import { useState, useEffect } from "react";
import Header from "./assets/Components/Header";
import Input from "./assets/Components/Input";
import { TodoProvider } from "./contexts/todoContext";
import { TodosInterface } from "./contexts/todoContext";
import TodoItem from "./assets/Components/Todoitem";

function App() {
  const [todos, settodos] = useState<TodosInterface[]>([]);

  const addTodo = (todo: TodosInterface) => {
    settodos((prev) => [...prev, { ...todo }]); // Fixed `Date.now()`
  };

  const completeTodo = (id: number) => {
    settodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, complete: !prevTodo.complete } // Fixed comparison and field update
          : prevTodo
      )
    );
  };

  const deleteTodo = (id: number) => {
    settodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  // Load todos from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      if (Array.isArray(parsedTodos)) {
        settodos(parsedTodos);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        completeTodo,
        deleteTodo,
      }}
    >
      <h1 className="text-3xl text-center font-bold bg-slate-400 border-b-2 ml-2 mr-2 border-blue-800">
        <Header />
      </h1>
      <Input />
      <div className="flex flex-wrap gap-y-3">
        {/* Loop through todos and render TodoItem for each */}
        {todos.map((todo) => (
          <div key={todo.id} className="w-full">
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>
    </TodoProvider>
  );
}

export default App;