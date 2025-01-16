import { TodosInterface, useTodoContext } from "../../contexts/todoContext";

interface TodoItemProps {
  todo: TodosInterface;
}

function TodoItem({ todo }: TodoItemProps) {
  const { completeTodo, deleteTodo } = useTodoContext();

  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`bg-white w-full md:w-4/5 lg:w-3/4 p-4 flex flex-col sm:flex-row gap-4 items-center rounded-lg shadow-lg transition-all duration-300 ${
          todo.complete ? "bg-blue-100" : "bg-white"
        } hover:shadow-xl`}
      >
        <input
          type="checkbox"
          className="cursor-pointer transition-all duration-300 transform scale-110 hover:scale-125"
          checked={todo.complete}
          onChange={() => completeTodo(todo.id)}
        />
        <div className="flex flex-col flex-grow">
          <div
            className={`task font-semibold ${
              todo.complete ? "line-through text-gray-500" : "text-black"
            }`}
          >
            {todo.task}
          </div>
        </div>
        <button
          className="text-red-600 hover:text-red-800 transition-colors duration-200 mt-2 sm:mt-0"
          onClick={() => deleteTodo(todo.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;