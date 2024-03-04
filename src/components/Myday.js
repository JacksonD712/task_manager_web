import React, { useState, useEffect } from 'react';

const Day = () => {
  const [inputs, setInputs] = useState(Array(24).fill('')); // State to store input values for each hour
  const [tasks, setTasks] = useState(Array(24).fill([])); // State to store tasks for each hour
  const [completedTasks, setCompletedTasks] = useState([]); // State to store completed tasks
  const [activeTab, setActiveTab] = useState('day'); // 'day' or 'night' tab
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [buttonDisabled, setButtonDisabled] = useState(Array(24).fill(false));

  // Function to handle input change for each hour
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  
    const newButtonDisabled = [...buttonDisabled];
    newButtonDisabled[index] = value.trim() === ''; 
    setButtonDisabled(newButtonDisabled);
  };

  // Function to handle task completion in active tasks section
  const handleTaskCompletion = (hourIndex, taskIndex) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks[hourIndex][taskIndex];
    updatedTasks[hourIndex] = updatedTasks[hourIndex].filter((_, i) => i !== taskIndex);
    setTasks(updatedTasks);

    const newCompletedTasks = [...completedTasks, completedTask];
    setCompletedTasks(newCompletedTasks);
  };

  // Function to move task back to active tasks in completed tasks section
  const handleMoveTaskBack = (taskIndex) => {
    const taskToMove = completedTasks[taskIndex];
    setCompletedTasks(completedTasks.filter((_, i) => i !== taskIndex));

    // Find the first empty slot in tasks and add the task
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].length === 0) {
        const updatedTasks = [...tasks];
        updatedTasks[i] = [taskToMove];
        setTasks(updatedTasks);
        return;
      }
    }
  };

  // Function to delete a task in the active tasks section
  const handleDeleteTask = (hourIndex, taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[hourIndex] = updatedTasks[hourIndex].filter((_, i) => i !== taskIndex);
    setTasks(updatedTasks);
  };

  // Function to delete a task in the completed tasks section
  const handleDeleteCompletedTask = (taskIndex) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks.splice(taskIndex, 1);
    setCompletedTasks(updatedCompletedTasks);
  };

  // Function to add a task for a specific hour
  const handleAddTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = [...newTasks[index], inputs[index]];
    setTasks(newTasks);
    handleInputChange(index, '');
  };

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
  };

  // Simulating loading effect
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust the delay time as needed

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-screen-md p-4">
        <div className="flex flex-wrap justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-tl-lg ${activeTab === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabChange('day')}
          >
            Active Tasks
          </button>
          <button
            className={`px-4 ml-2 py-2 rounded-tr-lg ${activeTab === 'night' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabChange('night')}
          >
            Completed
          </button>
        </div>
        <div className="p-4">
          {isLoading && (
            <div className="flex justify-center items-center h-32">
              <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
              <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
              <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
            </div>
          )}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-screen-md"> {/* Centering container */}
              {!isLoading && activeTab === 'day' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
                  {Array.from({ length: 24 }, (_, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex items-center mb-2">
                        <div className="w-full sm:w-1/2 text-center sm:text-right mr-2">
                          {`${index < 10 ? '0' : ''}${index}:00`}
                        </div>
                        <input
                          className="w-full sm:w-4/5 border border-gray-300 p-2 text-black"
                          type="text"
                          placeholder="Enter task..."
                          value={inputs[index]}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        <button
                          className="ml-2 px-3 py-1 bg-blue-500 rounded-md"
                          onClick={() => handleAddTask(index)}
                          disabled={!inputs[index].trim()} // Disable button when input is empty
                        >
                          +
                        </button>
                      </div>
                      <div className="bg-black text-white flex flex-col justify-center items-center">
                        {tasks[index] && tasks[index].length > 0 ? (
                          tasks[index].map((task, i) => (
                            <div key={i} className="flex items-center mt-1">
                              <input
                                type="checkbox"
                                className="mr-5"
                                onChange={() => handleTaskCompletion(index, i)}
                              />
                              <div>{task}</div>
                              <button
                                className="ml-2 px-2 py-1 bg-gray-700 text-white rounded-md"
                                onClick={() => handleDeleteTask(index, i)}
                              >
                                Delete
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-300 mt-1">No tasks for this hour</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!isLoading && activeTab === 'night' && (
                <div className="text-center p-4">
                  <div className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg bg-white text-center shadow-md">
                      <div className="border-b-2 border-gray-300 dark:border-gray-600 dark:text-gray-50 h-full flex justify-center items-center">
                        <p className="mb-0">Completed Tasks</p>
                      </div>
                      <div className="p-6 flex flex-col justify-center items-center">
                        {completedTasks.length > 0 ? (
                          completedTasks.map((task, index) => (
                            <div key={index} className="flex items-center justify-between w-full">
                              <div>{task} </div>
                              <div>
                                <button
                                  onClick={() => handleDeleteCompletedTask(index)}
                                  className="ml-2 text-red-500 focus:outline-none"
                                >
                                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M10 1C4.48 1 0 5.48 0 11s4.48 10 10 10 10-4.48 10-10S15.52 1 10 1zm4.38 13.82a.75.75 0 1 1-1.06 1.06L10 11.06l-3.32 3.32a.75.75 0 0 1-1.06-1.06L8.94 10 5.62 6.68a.75.75 0 0 1 1.06-1.06L10 8.94l3.32-3.32a.75.75 0 0 1 1.06 1.06L11.06 10l3.32 3.32z"
                                    ></path>
                                  </svg>
                                </button>
                                <input
                                  type="checkbox"
                                  onChange={() => handleMoveTaskBack(index)}
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>No completed tasks</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day;
