import React, { useState, useEffect } from 'react';
import './TaskList.css';
import { Link, useNavigate } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchData = async () => {
    try {
      let apiUrl = 'http://localhost:5000/api/task';
      const authtoken = localStorage.getItem('token');
      if (!authtoken) {
        console.error('Authentication token is missing.');
        return;
      }
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
          'authtoken': authtoken
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);  // Set the fetched projects in the state
        console.log(data);
      } else {
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, []);

const formatApplicationDeadline = (deadline) => {
  const date = new Date(deadline);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const handleStatusChange = async (taskId, newStatus) => {
  try {
    const authtoken = localStorage.getItem('token'); // Get the authentication token
    console.log('Authentication token:', authtoken);

    const response = await fetch(`http://localhost:5000/api/task/${taskId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authtoken, // Include the authentication token
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      console.log('Updated Task:', updatedTask);
      // Task status updated successfully, update the UI
      const updatedTasks = tasks.map((task) => {
        if (taskId === updatedTask._id) {
          return updatedTask;
        }
        return task;
      });
      setTasks(updatedTasks);
      return; 
    } else {
      console.error('Failed to update task status:', response.status, response.statusText);
      return; 
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
const handleLogout = () => {
  // Clear the user's role from local storage
  localStorage.removeItem('userRole');
  
  // Redirect to the login page
  navigate('/');
};


return (
  <>
  <div>
      <button onClick={handleLogout} className='btn-logout'>Logout</button>
  </div>
  <div className='task-dashboard'>
    <h1 className='task-heading'>Task List</h1>
    <button className="create-task-button">
        <Link to='/createtask' >Create New Task</Link>
    </button>
    <div className="task-cards">
        {tasks.map((task)  => (
          <div className="task-card" key={task._id}>
            <h2>{task.name}</h2>
            <p><span>Description:</span> {task.description}</p>
            <p><span>Due Date:</span> {formatApplicationDeadline(task.dueDate)}</p>
            <p><span>Priority:</span> {task.priority}</p>
            <p><span>Status:</span> {task.status}</p>
            <button onClick={() => handleStatusChange(task._id, 'In Progress')}>Start</button>
            <button onClick={() => handleStatusChange(task._id, 'Completed')}>Complete</button>
          </div>
        ))}
      </div>
  </div>
  </>
);
}

export default TaskList;
