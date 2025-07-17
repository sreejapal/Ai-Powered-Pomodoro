import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const session_id = uuidv4(); // Temporary; later from FastAPI


const ToDoList = ({ resetAll }) => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const loadTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('session_id', session_id);

    if (!error && data) setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = () => {
    if (!input || input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };
  const toggleTask = async(id, done) => {
    await supabase.from('tasks').update({ done: !done }).eq('id', id);
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !done } : t));
  };

  const deleteTask = async(id) => {
    await supabase.from('tasks').delete().eq('id', id);
    setTasks(tasks.filter(t => t.id !== id));
  };
  const resetTasks = async() => {
    await supabase.from('tasks').delete().eq('session_id', session_id);
    setTasks([]);
  };
  useEffect(() => {
    if (resetAll) {
      setTasks([]);
    }
  }, [resetAll]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl w-96">
      <h2 className="text-xl font-bold mb-4">📝 To-Do List</h2>
      <div className="flex mb-4">
        <input
          className="border flex-1 px-3 py-2 rounded-l-xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-xl"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2 max-h-52 overflow-y-auto">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center">
            <label className={`flex-1 ${task.done ? 'line-through text-gray-400' : ''}`}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="mr-2"
              />
              {task.text}
            </label>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={resetTasks}
        className="mt-4 bg-red-400 text-white px-4 py-2 rounded-xl"
      >
        Reset List
      </button>
    </div>
  );
};
export default ToDoList;