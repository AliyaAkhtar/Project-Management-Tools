import './App.css';
import CreateProjectForm from './components/CreateProjectForm';
import Login from './components/Login';
import ProjectDashboard from './components/ProjectDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import Signup from './components/Signup';
import TaskList from './components/TaskList';

function App() {
  return (
    <>
    <Router>
       <ToastContainer />
       <Routes>
       <Route exact path='/' element={<Login/>}/>
       <Route exact path='/signup' element={<Signup/>}/>
       <Route exact path='/projectdashboard' element={<ProjectDashboard/>}/>
       <Route exact path='/createproject' element={<CreateProjectForm/>}/>
       <Route exact path='/createtask' element={<TaskForm/>}/>
       <Route exact path='/task' element={<TaskList/>}/>
       </Routes>

    </Router>
      {/* <Login/> */}
      {/* <CreateProjectForm/> */}
      {/* <ProjectDashboard/> */}
    </>
  );
}

export default App;
