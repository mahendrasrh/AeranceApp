
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';


import FormDataPage from './Components/FormDataPage/FormDataPage';
import DisplayDataPage from './Components/DisplayDataPage/DisplayDataPage';
import Dashboard from './Components/Dashboard';
import InstitutionRegister from './Components/InstitutionRegister';
import UserManagement from './Components/UserManagement/userManagement';
function App() {
  return (
<>


<Routes>
<Route path="/login" element={<Login/>} />
<Route path="/institution-register" element={<InstitutionRegister/>} />
<Route path="/payslip-generator" element={<Dashboard/>} />
<Route path="/form" element={<FormDataPage/>} />
<Route path="/employee-information" element={<DisplayDataPage/>} />
<Route path="/user-management" element={<UserManagement/>} />


</Routes>

</>
  );
}

export default App;


