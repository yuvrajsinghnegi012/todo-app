import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskDetail from './TaskDetail';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskApi';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const task = await updateTask(updatedTask._id, updatedTask);
      setTasks(tasks.map(t => (t._id === task._id ? task : t)));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-bold text-center mb-12 text-gradient text-blue-700 ">
        Task Management
      </h1>
      <div className="mb-12">
        <TaskForm onSave={editingTask ? handleUpdateTask : handleAddTask} task={editingTask} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map(task => (
          <div key={task._id} className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">{task.title}</h2>
            <p className="mb-6 text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500 mb-4">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <div className="flex justify-end space-x-4">
              <button 
                className="py-2 px-4  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                onClick={() => setSelectedTask(task)}
              >
                View
              </button>
              <button 
                className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                onClick={() => setEditingTask(task)}
              >
                Edit
              </button>
              <button 
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedTask && (
        <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default TaskList;


