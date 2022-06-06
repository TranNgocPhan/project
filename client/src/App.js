import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../src/pages/Home';
import Login from '../src/pages/Login'; 
import Register from '../src/pages/Register';
import Postdetail from '../src/pages/Postdetail';
import Post from '../src/pages/PostPage';
import Category from '../src/pages/Category';
import BMI from '../src/pages/BMI';
import BMR from '../src/pages/BMR';
import Profile from '../src/pages/Profile';
import HospitalSearchPage from '../src/pages/HospitalSearchPage';
import Admin from '../src/pages/Admin';
import AddingUserForm from '../src/pages/AddingUserForm';
import UpdatingUserForm from '../src/pages/UpdatingUserForm';
import UpdatingAccountForm from '../src/pages/UpdatingAccountForm';
import UpdatingAccountTypeForm from '../src/pages/UpdatingAccountTypeForm';
import AddingDiseaseForm from '../src/pages/AddingDiseaseForm';
import UpdatingDiseaseForm from '../src/pages/UpdatingDiseaseForm';

function App() {
    return (  
          <Routes>           
              <Route path="/" element={<Home />} />
              <Route path="/Signin" element={<Login />} />
              <Route path="/Signup" element={<Register />} />
              <Route path="/Illness" element={<Postdetail />} />
              <Route path="/Post" element={<Post />} />
              <Route path="/Category" element={<Category />} />
              <Route path="/BMI" element={<BMI />} />
              <Route path="/BMR" element={<BMR />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/HospitalSearch" element={<HospitalSearchPage />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Admin/AddUserForm" element={<AddingUserForm />} />
              <Route path="/Admin/UpdateUserForm" element={<UpdatingUserForm />} />
              <Route path="/Admin/UpdateAccountForm" element={<UpdatingAccountForm />} />
              <Route path="/Admin/UpdateAccountTypeForm" element={<UpdatingAccountTypeForm />} />
              <Route path="/Admin/AddDiseaseForm" element={<AddingDiseaseForm />} />
              <Route path="/Admin/UpdateDiseaseForm" element={<UpdatingDiseaseForm />} />
          </Routes>              
    );
}

export default App;
