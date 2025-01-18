import { useState, useEffect } from "react";

import axios from "axios";
import { TodoProvider } from "./contexts/todoContext";
import { TodosInterface } from "./contexts/todoContext";
import TodoItem from "./Components/Todoitem";
import Header from "./Components/Header";
import Input from "./Components/Input";


function App() {

  const [Todos, setTodos] = useState<TodosInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/add/todos");
        setTodos(response.data); // Update the state with fetched todos
        console.log("data fetched"+ Todos)
        setLoading(false);
      } catch (err) {
        console.error("Error fetching todos:", err);
        setError("Unable to fetch todos. Please try again.");
        setLoading(false);
      }
    };

    fetchTodos();
  }, [Todos]);

  if (loading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  // const addTodo = (todo: TodosInterface) => {



  //   settodos((prev) => [...prev, { ...todo }]); // Fixed `Date.now()`
  // };


  const completeTodo = async (tid: number) => {
    try {
      console.log("Marking task as complete, ID:", tid);
  
      const response = await axios.put(`http://localhost:3000/update/update/complete`, {
        tid, // Passing tid in the request body
      });
  
      console.log("Todo completed:", response.data);

    } catch (error: any) {
      console.error("Error completing todo:", error);
      const message = error.response?.data?.error || "Failed to complete the todo. Please try again.";
      alert(message);
    }
  };
  const deleteTodo = async (id: Number) => {
    try {

      const response = await axios.delete(`http://localhost:3000/update/delete/${id}`);
      console.log("Todo deleted:", response.data);

    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete the todo. Please try again.");
    }
  };

  return (
    <TodoProvider
      value={{
        
        
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
        {Todos.map((todo) => (
          <div key={todo.id} className="w-full">
            
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>
    </TodoProvider>
  );
}

export default App;