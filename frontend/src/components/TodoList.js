import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { task, completed: false }]);
    setTask('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index].task);
  };

  const saveEdit = (index) => {
    const newTasks = [...tasks];
    newTasks[index].task = editedTask;
    setTasks(newTasks);
    setEditIndex(null);
    setEditedTask('');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedTask('');
  };

  return (
    <div className="todo-list">
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                <span style={{ textDecoration: task.completed ? 'line-through' : '' }}>
                  {task.task}
                </span>
              )}
            </div>
            <div>
              {editIndex === index ? (
                <>
                  <button onClick={() => saveEdit(index)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(index)}>Edit</button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
