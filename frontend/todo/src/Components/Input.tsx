import { useState } from "react";
import { useTodoContext } from "../contexts/todoContext";


function Input() {
  const [task, setTask] = useState("");

  const { addTodo } = useTodoContext();

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    addTodo({
      id: Date.now(), // Placeholder
      task,
      complete: false, // Default value
    });

    setTask(""); // Clear input after adding
    console.log("added");
  };

  return (
    <div className="flex justify-center items-center py-6">
      <div className="bg-white w-full md:w-4/5 lg:w-3/4 p-6 flex flex-col sm:flex-row items-center justify-between rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-blue-50">
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full sm:w-3/4 h-12 px-6 py-3 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg placeholder-gray-500 transition-all duration-200"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white h-12 w-full sm:w-20 ml-4 mt-4 sm:mt-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          onClick={add}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Input;