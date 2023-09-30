import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TaskForm.css';

function TaskForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'To Do',
    assignedTo: '', // This should be a user ID
    project: '', // This should be a project ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/task/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Task created successfully
        toast.success('Task created successfully!');
        // Clear the form fields
        setFormData({
            name: '',
            description: '',
            dueDate: '',
            priority: 'Medium',
            status: 'To Do',
            assignedTo: '',
            project: '',
        });
      } else {
        // Task not created successfully
        toast.warning('Task not created!');
        const data = await response.json();
        console.error('Failed to create task:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-task-form">
      <h2 className='task-heading'>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="formgroup">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="formgroup">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}/>
        </div>
        <div className="formgroup">
          <label htmlFor="dueDate">Due Date</label>
          <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} required/>
        </div>
        <div className="formgroup">
          <div className="side-by-side">
            <div className="priority-field">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" className='select' value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="status-field">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" className='select' value={formData.status} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        {/* <div className="formgroup">
          <label htmlFor="assignedTo">Assigned To</label>
          <input type="text" id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} required />
        </div>
        <div className="formgroup">
          <label htmlFor="project">Project</label>
          <input type="text" id="project" name="project" value={formData.project} onChange={handleChange} required />
        </div> */}
        <button type="submit" className='btnsubmit'>Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
