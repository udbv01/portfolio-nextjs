import React, { useState, useEffect, useRef } from 'react';
import '../../styles/globals.css';

type Task = {
  text: string;
  completed: boolean;
  dueDate: string | null;
  routine: boolean;
  priority: string;
  subTasks: Task[];
  lastCompleted: Date | null;
};

export default function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [routine, setRoutine] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>('normal');
  const [newSubTasks, setNewSubTasks] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset completed tasks daily
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const updatedTasks = tasks.map((task) => {
        if (task.routine && task.lastCompleted) {
          const lastCompletedDate = new Date(task.lastCompleted);
          const timeDifference = currentDate.getTime() - lastCompletedDate.getTime();
          const daysDifference = timeDifference / (1000 * 3600 * 24);
          // Reset wenn über 24h vergangen
          if (daysDifference >= 1) {
            return { ...task, completed: false, lastCompleted: currentDate };
          }
        }
        return task;
      });
      setTasks(updatedTasks);
    }, 24 * 60 * 60 * 1000); // Check alle 24h

    return () => clearInterval(interval);
  }, [tasks]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'incomplete') {
      return !task.completed;
    }
    return true;
  });

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('Bitte geben Sie eine Aufgabe ein.');
      return;
    }
    setTasks([
      ...tasks,
      {
        text: newTask,
        completed: false,
        dueDate,
        routine,
        priority,
        subTasks: [],
        lastCompleted: routine ? new Date() : null,
      },
    ]);
    setNewTask('');
    setDueDate(null);
    setRoutine(false);
    setPriority('normal');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleDeleteTask = (index: number) => {
    const confirmDelete = window.confirm('Wirklich löschen?');
    if (confirmDelete) {
      setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed, lastCompleted: new Date() } : task
    );
    setTasks(updatedTasks);
  };

  const addSubTask = (taskIndex: number) => {
    const subTaskText = newSubTasks[taskIndex]?.trim();
    if (!subTaskText) {
      alert('Unteraufgabe darf nicht leer sein.');
      return;
    }
  
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex
        ? {
            ...task,
            subTasks: [
              ...(task.subTasks || []),
              {
                text: subTaskText,
                completed: false,
                dueDate: null,
                routine: false,
                priority: 'normal',
                subTasks: [],
                lastCompleted: null,
              },
            ],
          }
        : task
    );
    setTasks(updatedTasks);
  
    const updatedSubTasks = [...newSubTasks];
    updatedSubTasks[taskIndex] = '';
    setNewSubTasks(updatedSubTasks);
  };
  

  const handleSubTaskCompletion = (taskIndex: number, subTaskIndex: number) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        const updatedSubTasks = task.subTasks.map((subTask, subIndex) =>
          subIndex === subTaskIndex
            ? { ...subTask, completed: !subTask.completed }
            : subTask
        );
        return { ...task, subTasks: updatedSubTasks, completed: updatedSubTasks.every(sub => sub.completed) };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'dringend':
        return 'bg-red-600';
      case 'normal':
        return 'bg-yellow-500';
      case 'ok':
        return 'bg-green-600';
      default:
        return '';
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-top md-justify-center items-center bg-gray-900 text-white py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">To-Do App</h1>
      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <input
          ref={inputRef}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Aufgabe hinzufügen..."
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-6 mb-4">
          <label>
            <input
              type="checkbox"
              checked={routine}
              onChange={() => setRoutine(!routine)}
              className="mr-2"
            />
            Routine-Aufgabe
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="dueDate" className="block">Fälligkeitsdatum:</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-4"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="priority" className="block">Wichtigkeit:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-4"
          >
            <option value="normal">Normal</option>
            <option value="dringend">Hoch</option>
            <option value="ok">Niedrig</option>
          </select>
        </div>
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mb-4"
        >
          Aufgabe hinzufügen
        </button>

        <div className="w-full flex justify-between mb-4">
  <button
    onClick={() => setFilter('all')}
    className={`px-4 py-2 rounded-lg ${
      filter === 'all' ? 'bg-blue-700' : 'bg-blue-500'
    } text-white`}
  >
    Alle
  </button>
  <button
    onClick={() => setFilter('completed')}
    className={`px-4 py-2 rounded-lg ${
      filter === 'completed' ? 'bg-blue-700' : 'bg-blue-500'
    } text-white`}
  >
    Erledigt
  </button>
  <button
    onClick={() => setFilter('incomplete')}
    className={`px-4 py-2 rounded-lg ${
      filter === 'incomplete' ? 'bg-blue-700' : 'bg-blue-500'
    } text-white`}
  >
    Unerledigt
  </button>
</div>


        <ul className="space-y-4 overflow-y-auto">
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg shadow-md ${task.completed ? 'bg-gray-600' : 'bg-gray-700'} ${
                task.routine ? 'border-4 border-blue-500' : ''
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                    className="mr-2"
                  />
                  <span
                    className={`${
                      task.completed ? 'line-through text-gray-500' : ''
                    } flex-1`}
                  >
                    {task.text}
                  </span>
                  {task.routine && (
                    <span className="ml-2 text-blue-500">🔁</span> // Wiederholungs-Symbol
                  )}
                </div>
                <div className="relative flex items-center p-2">
                  <div className={`tooltip w-4 h-4 rounded-full ${getPriorityColor(task.priority)}`} data-tooltip={task.priority}></div>
                </div>
                </div>
              <div className="ml-6">
                {task.subTasks.map((subTask, subIndex) => (
                  <div key={subIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={subTask.completed}
                      onChange={() => handleSubTaskCompletion(index, subIndex)}
                      className="mr-2"
                    />
                    <span className={`${subTask.completed ? 'line-through text-gray-500' : ''}`}>
                      {subTask.text}
                    </span>
                  </div>
                ))}
                <div className="flex mt-4 space-x-2">
                  <input
                    type="text"
                    value={newSubTasks[index] || ''}
                    onChange={(e) => {
                      const updatedSubTasks = [...newSubTasks];
                      updatedSubTasks[index] = e.target.value;
                      setNewSubTasks(updatedSubTasks);
                    }}
                    placeholder="eine Unteraufgabe"
                    className="px-2 py-2 bg-gray-700 text-white rounded-lg"
                  />
                  <button
                    onClick={() => addSubTask(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleDeleteTask(index)}
                className="ml-6 mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
