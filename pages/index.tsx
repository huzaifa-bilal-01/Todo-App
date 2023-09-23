import { useState } from "react";

export default function Home() {
  const [userinput, setUserInput] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");
  const [completed, setCompleted] = useState<boolean[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value);
  }

  function handleClick() {
    if (userinput.trim() !== "") {
      setTodos([...todos, userinput]);
      setCompleted([...completed, false]); // Initialize completion state to false
      setUserInput("");
    }
  }

  function handleEdit(index: number) {
    setEditIndex(index);
    setEditedTask(todos[index]);
  }

  function handleSave(index: number) {
    const newTodos = [...todos];
    newTodos[index] = editedTask;
    setTodos(newTodos);
    setEditIndex(null);
  }

  function handleDelete(index: number) {
    const newTodos = [...todos];
    const newCompleted = [...completed];
    newTodos.splice(index, 1);
    newCompleted.splice(index, 1);
    setTodos(newTodos);
    setCompleted(newCompleted);
    setEditIndex(null);
  }

  function handleComplete(index: number) {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index]; // Toggle completion state
    setCompleted(newCompleted);
  }

  return (
    <div className="text-center align-item-center justify-center">
      <h1 className="mt-5 text-5xl font-bold text-black">TODO APP</h1>
      <input
        type="text"
        value={userinput}
        onChange={handleChange}
        className="mt-5 border-2 border-gray-400 rounded-md px-2 py-1"
        placeholder="Enter your task"
      />
      <button
        onClick={handleClick}
        className="text-white ml-2 rounded-md bg-slate-400 px-2 py-1 hover:bg-slate-500"
      >
        Add Task
      </button>
      <div className="mt-4">
        {todos.map((task, index) => (
          <div key={index} className="flex justify-center">
            <div
              className={`bg-gray-200 rounded-md px-4 py-4 mt-2 ${
                completed[index] ? "line-through" : ""
              }`}
            >
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  className="text-white ml-2 rounded-md bg-blue-400 px-4 py-4 mt-2 hover:bg-blue-500"
                />
              ) : (
                task
              )}
            </div>
            {editIndex === index ? (
              <button
                onClick={() => handleSave(index)}
                className="text-white ml-2 rounded-md bg-green-400 px-4 py-4 mt-2 hover-bg-green-500"
              >
                Done
              </button>
            ) : (
              <button
                onClick={() => handleEdit(index)}
                disabled={completed[index]}
                className="text-white ml-2 rounded-md bg-green-400 px-4 py-4 mt-2 hover:bg-green-500"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(index)}
              className="text-white ml-2 rounded-md bg-red-400 px-4 py-4 mt-2 hover:bg-red-500"
            >
              Delete
            </button>
            <button
              onClick={() => handleComplete(index)}
              className="text-white ml-2 rounded-md bg-yellow-400 px-4 py-4 mt-2 hover:bg-yellow-500"
            >
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
