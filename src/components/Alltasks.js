import React, { useState } from 'react';

function Alltasks() {
  const [tasks, setTasks] = useState(Array(31).fill('').map(() => [{ task: '', time: '' }])); // Assuming 31 days in a month
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState(2022);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const handleTaskChange = (dayIndex, taskIndex, field, event) => {
    const newTasks = [...tasks];
    newTasks[dayIndex][taskIndex] = { ...newTasks[dayIndex][taskIndex], [field]: event.target.value };
    setTasks(newTasks);
  };
  const removeTask = (dayIndex, taskIndex) => {
    const newTasks = [...tasks];
    newTasks[dayIndex].splice(taskIndex, 1);
    setTasks(newTasks);
  };
  const addAnotherTask = (dayIndex) => {
    const newTasks = [...tasks];
    newTasks[dayIndex].push({ task: '', time: '' });
    setTasks(newTasks);
  };
  const getDaysInMonth = (month, year) => {
    return new Date(year, months.indexOf(month) + 1, 0).getDate();
  };
  const daysInMonth = Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => 2024 + i);

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <div className="flex items-center">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
      
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
       
      </header>
     
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="w-full grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:grid-rows-6">
          
            {daysInMonth.map((day, dayIndex) => (
              <div key={day} className="relative bg-white lg:col-span-1 lg:row-span-1">
                <div>{dayNames[new Date(selectedYear, months.indexOf(selectedMonth), day).getDay()]}</div>
                <time dateTime={`${selectedYear}-${months.indexOf(selectedMonth) + 1}-${day}`}>{day}</time>
              
                {tasks[dayIndex].map((task, taskIndex) => (
                  <div key={taskIndex}>
                    <p>Task: {task.task}</p>
                    <p>Time: {task.time}</p>
                    <button
                      onClick={() => removeTask(dayIndex, taskIndex)}
                      className="ml-2 px-2 py-1 text-sm text-black hover:text-red-700 focus:outline-none"
                    >
                      X
                    </button>
                  </div>
                ))}
               
                {tasks[dayIndex].map((task, taskIndex) => (
                  <div key={taskIndex}>
                    <input
                      type="text"
                      value={task.task}
                      onChange={(event) => handleTaskChange(dayIndex, taskIndex, 'task', event)}
                      placeholder="Task"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      type="time"
                      value={task.time}
                      onChange={(event) => handleTaskChange(dayIndex, taskIndex, 'time', event)}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
               
                <button
                  onClick={() => addAnotherTask(dayIndex)}
                  className="mt-2 ml-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Add Task
                </button>
              </div>
            ))}
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Alltasks;
