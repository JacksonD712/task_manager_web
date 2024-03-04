import React, { useState } from 'react';
import Day from './Myday.js';
import Alltasks from './Alltasks.js';
import myImage from './311257867_795413988242978_3146148854823656281_n.jpeg';



const Sidebar: React.FC = () => {
 
  const [selectedTab, setSelectedTab] = useState('myDay');
  const [tasks, setTasks] = useState<string[][]>([[], [], []]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]); // State for completed tasks
  const [taskInputs, setTaskInputs] = useState<string[]>(['', '', '']);
  const [isLoading, setIsLoading] = useState(false); 
  const handleTabClick = (tab: string): void => {
    setIsLoading(true); // Set loading state to true when switching tabs
    setSelectedTab(tab);
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after a delay (you can adjust this delay as needed)
    }, 3000); // Delay of 1 second (1000 milliseconds)
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>, tabIndex: number): void => {
    const newTaskInputs = [...taskInputs];
    newTaskInputs[tabIndex] = event.target.value;
    setTaskInputs(newTaskInputs);
  };

  const handleAddTask = (tabIndex: number): void => {
    if (taskInputs[tabIndex].trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[tabIndex] = [...updatedTasks[tabIndex], taskInputs[tabIndex]];
      setTasks(updatedTasks);
      setTaskInputs(['', '', '']);
    }
  };

  const handleDeleteTask = (tabIndex: number, taskIndex: number): void => {
    const updatedTasks = [...tasks];
    updatedTasks[tabIndex] = tasks[tabIndex].filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };
  const handleDeleteTask1 = (taskIndex: number): void => {
    setCompletedTasks(prevCompletedTasks => {
      const updatedCompletedTasks = [...prevCompletedTasks];
      updatedCompletedTasks.splice(taskIndex, 1);
      return updatedCompletedTasks;
    });
  };
  
  const handleTaskCompletion = (tabIndex: number, taskIndex: number): void => {
    const completedTask = tasks[tabIndex][taskIndex]; // Get completed task
    setCompletedTasks([...completedTasks, completedTask]); // Add completed task to completedTasks
    handleDeleteTask(tabIndex, taskIndex); // Remove task from tasks
  };
  
  
  const generateCards = (): JSX.Element => {
    const today: Date = new Date();
    const weekday: number = today.getDay(); 
    const numberOfDuplicates: number = 7; 
    const firstRowCards: JSX.Element[] = [];
    const secondRowCards: JSX.Element[] = [];
    
    // Generate cards for Monday to Thursday (first row)
    for (let i: number = 0; i < 4; i++) {
      const currentDayIndex: number = (weekday + i) % 7;
      const dayName: string = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i));
      const dayTasks = tasks[i] || [];
      const cardHeight = Math.max(60 + dayTasks.length * 30, 60);
    
      firstRowCards.push(
        <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-4 px-2">
          <div className="block max-w-[18rem] rounded-lg bg-black shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-white">
            <div className="border-b-2 border-[#0000002d] px-6 py-3 text-black">
              {dayName}
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-black">
                Add Task
              </h5>
              <div className="mb-4">
                <input
                  type="text"
                  value={taskInputs[i]}
                  onChange={(event) => handleTaskChange(event, i)}
                  className="appearance-none bg-transparent border-b-2 border-gray-300 w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Enter task..."
                />
                <button
                  className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAddTask(i)}
                >
                  +
                </button>
              </div>
              <ul className="list-disc pl-5 ">
                {dayTasks.map((task, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => handleTaskCompletion(i, index)}
                      className="mr-2"
                    />
                    {task}
                    <button
                      className="ml-auto  py-1 px-2"
                      onClick={() => handleDeleteTask(i, index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    
    // Generate cards for Friday to Sunday (second row)
    for (let i: number = 4; i < numberOfDuplicates; i++) {
      const currentDayIndex: number = (weekday + i) % 7;
      const dayName: string = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i));
      const dayTasks = tasks[i] || [];
      const cardHeight = Math.max(60 + dayTasks.length * 30, 60);
    
      secondRowCards.push(
        <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-4 px-2">
          <div className="block max-w-[18rem] rounded-lg bg-black shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-white">
            <div className="border-b-2 border-[#0000002d] px-6 py-3 text-black">
              {dayName}
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-black">
                Add Task
              </h5>
              <div className="mb-4">
                <input
                  type="text"
                  value={taskInputs[i]}
                  onChange={(event) => handleTaskChange(event, i)}
                  className="appearance-none bg-transparent border-b-2 border-gray-300 w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Enter task..."
                />
                <button
                  className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAddTask(i)}
                >
                  +
                </button>
              </div>
              <ul className="list-disc pl-5 ">
                {dayTasks.map((task, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => handleTaskCompletion(i, index)}
                      className="mr-2"
                    />
                    {task}
                    <button
                      className="ml-auto  py-1 px-2"
                      onClick={() => handleDeleteTask(i, index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <div className="flex flex-wrap">{firstRowCards}</div>
        <div className="flex flex-wrap mt-4">{secondRowCards}</div>
      </div>
    );
  }; 
  

  const renderTabContent = (): JSX.Element | null => {
    switch (selectedTab) {
      case 'myDay':
        return (
          <div  >
            <Day/>
          </div>
        ); 
        case 'newTab2':
          return (
            <div>
              <div className="text-black mb-6">
                {/* Existing code */}
              </div>
              {isLoading && <div className="flex gap-2r justify-center items-center h-screen ml-3.5">
    <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
    <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
    <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
</div>} 
              
                <div className="flex ml-96 mb-6 mt-10">
                  <button
                    className={`tab-btn ${selectedTab === 'next7Days' ? 'active' : ''} flex justify-start space-x-6 focus:outline-none focus:text-indigo-400 text-black rounded`}
                    onClick={() => handleTabClick('next7Days')}
                  >
                    <p className="text-2xl leading-4 text-white">Active Tasks</p>
                  </button>
                  <button
                    className={`tab-btn ${selectedTab === 'newTab2' ? 'active' : ''} ml-72 flex justify-start space-x-6 focus:outline-none focus:text-indigo-400 text-black rounded`}
                    onClick={() => handleTabClick('newTab2')}
                  >
                    <p className="text-2xl leading-4 text-white">Completed Tasks</p>
                  </button>
                </div>
              
              {!isLoading && (
                <div className="text-black mb-6">
                  <div className="mt-11 block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-black ml-72 h-36">
                    <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                      Completed Tasks
                    </div>
                    <div className="p-6">
                      <ul className="mb-4 text-base text-black dark:text-neutral-200">
                        {completedTasks.map((task, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>{task}</div>
                            <button
                              className="text-red-500"
                              onClick={() => handleDeleteTask1(index)} // handleDeleteTask function to be implemented
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ); 
        
    
      case 'next7Days':
        return (
          
         
          <div className='bg-black'> 



 
<div className="flex ml-96 mt-10 ">
 
  <button className={`tab-btn ${selectedTab === 'next7Days' ? 'active' : ''} flex justify-start space-x-6 focus:outline-none focus:text-indigo-400   rounded`}
    onClick={() => handleTabClick('next7Days')}>

    <p className="text-2xl leading-4 text-white">Active Tasks</p>

  </button> 
  <button className={`tab-btn ${selectedTab === 'newTab2' ? 'active' : ''}ml-72 flex justify-start  space-x-6 focus:outline-none focus:text-indigo-400 text-black rounded`}
    onClick={() => handleTabClick('newTab2')}>
    <p className="text-2xl leading-4 text-white ">Completed Tasks </p>
  </button>
</div>
            {generateCards()}
            
          </div>

        );
      case 'allTasks':
        return (
          <div>
            <Alltasks/>
          </div>
        );
      
      default:
        return null;
    }
  };  
  return  (
    
    <div className=" flex bg-black ">
    <div className='h-screen'>
      
      <div className="xl:hidden flex  justify-between w-full p-6 items-center bg-black">
        <div className="flex justify-between items-center">
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z" />
    </svg>
    <p className="text-2xl leading-6 text-white">Task Manager </p>
  </div>
  <div aria-label="toggler" className="flex justify-center items-center">
  </div>
</div>
<div id="Main" className="xl:rounded-r transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start h-screen w-full sm:w-64 bg-black flex-col">

  <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z" fill="white" />
    </svg>
    <p className="text-2xl leading-6 text-white"> Task Manager </p>
  </div>
  <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
    <button className={`tab-btn ${selectedTab === 'myDay' ? 'active' : ''} flex justify-start items-center space-x-6 w-full focus:outline-none focus:text-indigo-400 text-gray-400 rounded`}
    onClick={() => handleTabClick('myDay')}>
    <svg className="fill-stroke " width="24" height="24"  fill="none"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path  fill="#ffffff"  d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z"/></svg>
      <p className="text-base leading-4 ">My Day </p>
    </button> 
    <button className={`tab-btn ${selectedTab === 'next7Days' ? 'active' : ''} flex justify-start items-center space-x-6 w-full focus:outline-none focus:text-indigo-400 text-gray-400 rounded`}
    onClick={() => handleTabClick('next7Days')}>
    <svg  className="fill-stroke " width="24" height="24"  fill="none"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="#ffffff" d="M512 160c0 35.3-28.7 64-64 64H280v64h46.1c21.4 0 32.1 25.9 17 41L273 399c-9.4 9.4-24.6 9.4-33.9 0L169 329c-15.1-15.1-4.4-41 17-41H232V224H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64v64zM448 416V352H365.3l.4-.4c18.4-18.4 20.4-43.7 11-63.6l71.3 0c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64V352c0-35.3 28.7-64 64-64l71.3 0c-9.4 19.9-7.4 45.2 11 63.6l.4 .4H64v64H210.7l5.7 5.7c21.9 21.9 57.3 21.9 79.2 0l5.7-5.7H448z"/></svg>
      <p className="text-base leading-4 ">Next 7 Days</p>
    </button>
    
    <button className={`tab-btn ${selectedTab === 'allTasks' ? 'active' : ''} flex justify-start items-center space-x-6 w-full focus:outline-none focus:text-indigo-400 text-gray-400 rounded`}
    onClick={() => handleTabClick('allTasks')}>
    <svg  className="fill-stroke " width="24" height="24"  fill="none"    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path  fill="#ffffff"  d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
      <p className="text-base leading-4 ">Calendar</p>
    </button>
  </div>
  <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
    
   
  </div>
  
  <div className="flex flex-col justify-between items-center h-full pb-6   px-6  w-full  space-y-32 ">
    
    <div className="hidden flex justify-start flex-col items-start pb-5 ">
      
    
      
    </div>
    <div className=" flex justify-between h-full bg-black items-center w-full">
      <div className="flex justify-center items-center  space-x-2">
      <div>
  <img className="w-28 rounded-full" src={myImage} alt="avatar" />
</div>
        <div className="flex justify-start flex-col items-start ">
          <p className="cursor-pointer text-sm leading-5 text-white">Jackson Doumith</p>
          <p className="cursor-pointer text-xs leading-3 text-gray-300">Web Developer</p>
        </div>
      </div>
      <svg className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

    </div>
    
  </div>
 
    </div>
    </div> 
   {renderTabContent()}
   
   </div>
  );
  };

export default Sidebar;