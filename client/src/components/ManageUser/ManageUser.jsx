import React, { useState, useEffect } from "react";
import "./style.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

function ManageUser() {
  const [post, setPost] = useState([]);
  // function handleDelete() {
  //   if(!(window.confirm('Are you sure you want to delete'))) return false;
  //   else console.log(1);
  // }
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3001/Admin/getUserList`);
      setPost(data);
    }
    fetchData();
  }, []);

  return (
    <>   
        <br />      
        <Link class="btn btn-primary mb-4" to="/Admin/AddUserForm" style={{fontSize: '1.2rem', marginLeft: '1.8rem'}}>Add</Link>
        <div style={{marginRight: '.4rem'}}>	
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Ảnh</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            <tbody>
            {post.map((obj,index) =>
              <tr>
                <td>{obj.ten}</td>
                <td>{obj.soDienThoai}</td>
                <td>{obj.email}</td>
                <td>{obj.diaChi}</td>
                <td>{obj.gioiTinh}</td>
                <td>{obj.ngaySinh}</td>
                <td>{obj.anh}</td>      
                <td>
                  <Link to="/Admin/UpdateUserForm" class="btn btn-info mr-3" style={{fontSize: '1.2rem'}}>Update</Link>           
                </td>
              </tr>
            )}
            </tbody>          
          </table>
        </div>
    </>
  );
}

export default ManageUser;