import { useState } from "react";

function Input() {
  const [task, setTask] = useState("");

  return (
    <div className="flex justify-center items-center">
      <div className="shadow-md rounded-lg p-6 bg-white w-full md:w-4/5 lg:w-3/4 flex flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Add task"
          value={task} // Binds the input value to the state
          onChange={(e) => setTask(e.target.value)} // Correctly updates state
          className="w-3/4 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white h-12 w-24 ml-2 rounded-lg transition duration-200"
          onClick={() => console.log(task)} // Logs the task to the console on button click
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Input;