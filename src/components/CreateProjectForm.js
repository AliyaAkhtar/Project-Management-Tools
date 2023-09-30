import React, { useState } from 'react';
import './CreateProjectForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const authtoken = localStorage.getItem('token');
        console.log('Token:', authtoken);

        const response = await fetch('http://localhost:5000/api/project/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'authtoken': localStorage.getItem('token'),
            'authtoken': authtoken,
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          // Project created successfully
          toast.success('Project created successfully!');
          // Clear the form fields
          setFormData({
            name: '',
            description: '',
            startDate: '',
            endDate: '',
          });
        } else {
            // Project not created successfully
          toast.warning('Project not created!');
          const data = await response.json();
          console.error('Failed to create project:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <div className="create-project-form">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input type="date" id="endDate"  name="endDate" value={formData.endDate} onChange={handleChange} required/>
        </div>
        <button type="submit" className='btnproject'>Create Project</button>
      </form>
    </div>
  );
}

export default CreateProjectForm;
