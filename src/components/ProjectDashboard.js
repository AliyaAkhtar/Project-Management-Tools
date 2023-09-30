import React, { useState, useEffect } from 'react';
import './ProjectDashboard.css';
import {Link, useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function ProjectDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:5000/api/project';
        const authtoken = localStorage.getItem('token');
        // if (!authtoken) {
        //   console.error('Authentication token is missing.');
        //   return;
        // }
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
            'authtoken': authtoken
          },
        });
        if (response.ok) {
          const data = await response.json();
          // // Filter projects based on the current user's identity (project manager or user)
          // const filteredProjects = data.filter((project) => {
          // // Replace 'userIdentity' with the actual identity of the user (e.g., username or user ID)
          // return project.projectManager === username; // or project.postedBy === userIdentity
        
        // setProjects(filteredProjects);
          setProjects(data);  // Set the fetched projects in the state
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

const handleDeleteProject = async (projectId) => {
  try {
    const apiUrl = `http://localhost:5000/api/project/${projectId}`;
    const authtoken = localStorage.getItem('token'); 

    if (!authtoken) {
      console.error('Authentication token is missing.');
      // Handle the missing token, possibly by redirecting to the login page
      return;
    }
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'authtoken': authtoken,
      },
    });
    if (response.ok) {
      // Remove the deleted project from the projects list in the state
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
    } else {
      console.error('Failed to delete project:', response.status, response.statusText);
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
      <button onClick={handleLogout}  className='btn-logout'>Logout</button>
    </div>
    <div className="project-dashboard">
      <h1 className='project-heading'>Project Dashboard</h1>
      <div className="button-container">
        <button className="view-task-button">
          <Link to='/task'>View Task List</Link>
        </button>
        <button className="create-project-button">
          <Link to='/createproject'>Create New Project</Link>
        </button>
      </div>
      <div className="project-cards">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <h2>{project.name}</h2>
            <p><span>Description:</span> {project.description}</p>
            <p><span>Start Date:</span> {formatApplicationDeadline(project.startDate)}</p>
            <p><span>End Date:</span> {formatApplicationDeadline(project.endDate)}</p>
            {/* <p><span>Project Manager:</span> {project.projectManager}</p> */}
            <button onClick={() => handleDeleteProject(project._id)} className="delete-project-button">
              Delete Project
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default ProjectDashboard;
