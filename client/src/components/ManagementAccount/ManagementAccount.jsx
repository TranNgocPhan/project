import React from "react";
import "./style.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

function ManagementAccount() {

  function handleBlock() {

  }

  return (
    <>   
        <br />      
        <div style={{marginRight: '.4rem'}}>	
          <table class="table table-striped table-hover">
            <thead class="thead-dark">
              <tr>
                <th>Tên đăng nhập</th>
                <th>Mật khẩu</th>               
                <th>Active status</th>
                <th>Update/Block</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>tri@gmail.com</td>
                <td>Tri123!</td>
                <td>true</td>                 
                <td>
                  <Link to="/Admin/UpdateAccountForm" class="btn btn-info mr-3" style={{fontSize: '1.2rem'}}>Update</Link>
                  <button class="btn btn-danger" style={{fontSize: '1.2rem'}} onClick={handleBlock}>Block</button>           
                </td>
              </tr>
              <tr>
                <td>tri@gmail.com</td>
                <td>Tri123!</td>
                <td>true</td>                 
                <td>
                  <Link to="/Admin/UpdateAccountForm" class="btn btn-info mr-3" style={{fontSize: '1.2rem'}}>Update</Link>
                  <button class="btn btn-danger" style={{fontSize: '1.2rem'}} onClick={handleBlock}>Block</button>           
                </td>
              </tr>
            </tbody>                       
          </table>
        </div>
    </>
  );
}

export default ManagementAccount;