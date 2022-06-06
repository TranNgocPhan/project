import React from "react";
import "./style.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

function ManagementAccountType() {
    return (
      <>   
        <br />      
        <div style={{marginRight: '.4rem'}}>	
          <table class="table table-striped table-hover">
            <thead class="thead-dark">
              <tr>
                <th>Tên loại tài khoản</th>
                <th>Tên đăng nhập</th>             
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Admin</td>
                <td>tri@gmail.com</td>                            
                <td>
                  <Link to="/Admin/UpdateAccountTypeForm" class="btn btn-info mr-3" style={{fontSize: '1.2rem'}}>Update</Link>        
                </td>
              </tr>
              <tr>
                <td>Admin</td>
                <td>tri@gmail.com</td>                           
                <td>
                  <Link to="/Admin/UpdateAccountTypeForm" class="btn btn-info mr-3" style={{fontSize: '1.2rem'}}>Update</Link>                  
                </td>
              </tr>
            </tbody>                       
          </table>
        </div>
    </>
    );
}

export default ManagementAccountType;