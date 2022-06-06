import React from 'react';
import "./style.css";
import ManagementAccount from '../ManagementAccount/ManagementAccount';
import ManagementAccountType from '../ManagementAccountType/ManagementAccountType';
import ManagementDisease from '../ManagementDisease/ManagementDisease';
import ManageUser from '../ManageUser/ManageUser';

function Admin() {
    return (
        <>
            <div className="container mt-3">
                <h2>Quản lý website</h2> <br />
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#manageUser" style={{fontWeight: 'bold'}}>Quản lý người dùng</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#manageAccount" style={{fontWeight: 'bold'}}>Quản lý tài khoản</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#manageAccountType" style={{fontWeight: 'bold'}}>Quản lý loại tài khoản</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#manageDisease" style={{fontWeight: 'bold'}}>Quản lý bệnh</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div id="manageUser" class="container tab-pane active">
                        <ManageUser />
                    </div>
                    <div id="manageAccount" class="container tab-pane fade">
                        <ManagementAccount />                 
                    </div>
                    <div id="manageAccountType" class="container tab-pane fade">
                        <ManagementAccountType />       
                    </div>
                    <div id="manageDisease" class="container tab-pane fade">
                        <ManagementDisease />       
                    </div>
                </div>
            </div>           
        </>
    );
}

export default Admin;