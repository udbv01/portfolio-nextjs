'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import '../../styles/globals.css';

type Task = {
  text: string;
  completed: boolean;
};

export default function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('Bitte geben Sie eine Aufgabe ein.');
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
    inputRef.current?.focus();
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">To-Do App</h1>
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <input
          ref={inputRef}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Aufgabe hinzufügen..."
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mb-4"
        >
          Aufgabe hinzufügen
        </button>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${
                task.completed ? 'bg-green-700 line-through' : 'bg-gray-700'
              }`}
            >
              <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
              <button
                onClick={() => handleDeleteTask(index)}
                className="text-red-500 hover:text-red-600"
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg text-gray-400">
          Diese To-Do-App wurde extra für das React-Portfolio entwickelt und ermöglicht das Hinzufügen, Löschen und Abhaken von Aufgaben.
        </p>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        ul::-webkit-scrollbar {
          width: 8px;
        }

        ul::-webkit-scrollbar-thumb {
          background-color: #4a5568;
          border-radius: 4px;
        }

        ul::-webkit-scrollbar-thumb:hover {
          background-color: #2d3748;
        }
      `}</style>
    </div>
  );
}
