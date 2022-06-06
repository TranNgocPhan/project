import React from "react";
import "./style.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

function ManagementDisease() {

  function handleDelete() {

  }

  return (
    <div style={{position: 'absolute', left: '12%', right: '4%'}}>   
        <br />      
        <Link class="btn btn-primary mb-4" to="/Admin/AddDiseaseForm" style={{fontSize: '1.2rem', marginLeft: '1.8rem'}}>Add</Link>
        <div style={{marginRight: '.4rem'}} class="d-flex align-items-center">	
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th>Tiêu đề bệnh</th>
                <th style={{maxWidth: '50rem'}}>Chi tiết bệnh</th>
                <th>Mã chuyên mục</th>
                <th>Mã chuyên gia</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mắt</td>
                <td style={{maxWidth: '50rem'}}>Đôi mắt chính là cửa sổ tâm hồn, vì thế đôi mắt cần phải được chăm chút và bảo vệ để luôn sáng ngời sức sống. Hello Bacsi sẽ mách bạn 5 bí quyết để giữ cho đôi mắt khỏe đẹp rất đơn</td>
                <td>3</td>
                <td>4</td>                  
                <td>
                  <Link to="/Admin/UpdateDiseaseForm" class="btn btn-info mr-3" style={{fontSize: '1.2rem'}}>Update</Link>
                  <button class="btn btn-danger" style={{fontSize: '1.2rem'}} onClick={handleDelete}>Delete</button>           
                </td>
              </tr>
              <tr>
                <td>Mắt</td>
                <td>Đôi mắt chính là cửa sổ tâm hồn, vì thế đôi mắt cần phải được chăm chút và bảo vệ để luôn sáng ngời sức sống. Hello Bacsi sẽ mách bạn 5 bí quyết để giữ cho đôi mắt khỏe đẹp rất đơn</td>
                <td>3</td>
                <td>4</td>                  
                <td>
                  <Link to="/Admin/UpdateDiseaseForm" class="btn btn-info mr-3" style={{fontSize: '1.2rem'}}>Update</Link>
                  <button class="btn btn-danger" style={{fontSize: '1.2rem'}} onClick={handleDelete}>Delete</button>           
                </td>
              </tr>
            </tbody>          
          </table>
        </div>
    </div>
  );
}

export default ManagementDisease;