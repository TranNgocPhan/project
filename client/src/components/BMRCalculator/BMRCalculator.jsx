import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './style.css';

function BMRCalculator() {
    const [sex, setSex] = useState('Nam');
    const infoBMR = useRef(), bmrNumber = useRef();
    const initialValues = {
        weight: '',
        height: '',
        age: ''
    }
    const validationSchema = Yup.object().shape({
        weight: Yup.number()
            .required("Bạn chưa nhập cân nặng")
            .typeError('Cân nặng phải là chữ số')
            .positive('Cân nặng phải lớn hơn 0'),
        height: Yup.number()
            .required("Bạn chưa nhập chiều cao")
            .typeError('Chiều cao phải là chữ số')
            .positive('Chiều cao phải lớn hơn 0'),
        age: Yup.number()
            .required('Bạn chưa nhập tuổi')
            .typeError('Tuổi phải là chữ số')
            .positive('Tuổi phải lớn hơn 0')
            .max(200, 'Tuổi không được vươt quá 200')
    });
    
    function handleSubmit() {
        let result;
        let weight = document.querySelector('#weightInfo').value;
        let height = document.querySelector('#heightInfo').value;
        let age = document.querySelector('#ageInfo').value;
        infoBMR.current.style.display = 'flex';
        if(sex === 'Nam') result = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
        else result = 9.99 * weight + 6.25 * height - 4.92 * age - 161;
        bmrNumber.current.textContent = result.toFixed(3);
    }

    return (
        <>
            <section>
                <div class="container">
                    <div class="jumbotron p-3 p-md-5 text-white rounded bg-warning">
                        <div class="col-md-6 px-0">
                            <h1 class="display-4 font-italic">Công Cụ Tính Chỉ Số BMR</h1>
                            <p class="text-danger">Sử dụng công cụ tính chỉ số BMR có thể giúp bạn xác định nhu cầu calo hàng ngày dựa trên chiều cao, cân nặng, tuổi và mức độ hoạt động của bạn.</p>
                        </div>
                    </div>
                </div>
            </section>					
            <section>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="jumbotron text-center">Mời bạn nhập thông tin cần thiết để tính</h3>	 
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} > 			  
                                <Form id="metric" ng-show="units == 'imperial'">
                                    <div className="form-group">
                                        <div className="radio">                           
                                            <Field
                                                type="radio"                    
                                                value="Nam"
                                                name="gioitinh"
                                                onChange={e => setSex(e.target.value)}
                                                checked={sex === 'Nam' ? true : false}
                                            />
                                            <span className="label label-danger" style={{marginLeft: '.6rem'}}>Nam</span>                                     
                                        </div>
                                        <div className="radio">                                           
                                            <Field
                                                type="radio"                
                                                value="Nữ"
                                                name="gioitinh"
                                                onChange={e => setSex(e.target.value)}
                                                checked={sex === 'Nữ' ? true : false}
                                            />
                                            <span className="label label-success" style={{marginLeft: '.6rem'}}>Nữ</span>                                   
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="weight">Cân Nặng (kg):</label>
                                        <Field
                                            placeholder="Cân Nặng (kg):"
                                            id="weightInfo"
                                            className="form-control input_weight"
                                            name="weight"
                                            style={{fontSize: '1.4rem', textIndent: '1.2rem'}}

                                        />
                                        <ErrorMessage name="weight" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="weight_foot">Chiều Cao (cm):</label>
                                        <Field                  
                                            placeholder="Chiều Cao (cm):"
                                            id="heightInfo"
                                            className="form-control input_height"
                                            name="height"              
                                            style={{fontSize: '1.4rem', textIndent: '1.2rem'}}
                                        />
                                        <ErrorMessage name="height" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="weight_foot">Nhập tuổi của bạn:</label>
                                        <Field                  
                                            placeholder="Tuổi:"
                                            id="ageInfo"
                                            className="form-control input_age"
                                            name="age"              
                                            style={{fontSize: '1.4rem', textIndent: '1.2rem'}}
                                        />
                                        <ErrorMessage name="age" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginTop: '.6rem', fontSize: '1.4rem'}} />
                                    </div>
                                    <button className="btn_Calo" type="submit">Tính</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{display: 'none'}} className="blur" ref={infoBMR}>
                <div className="blur_overllay"></div>
                <div className="alert_calculate">
                    <div className="blur_overllay"></div>
                    <div className="alert_calculate">    
                        <div>
                            <span style={{fontWeight: 'bold', color: 'green'}} className="alert_calculate-text">Chỉ số BMR của bạn</span>
                            <span className="alert_calculate-text bmiNumber" ref={bmrNumber}></span>
                            <button className="alert_calculate-btn" onClick={() => infoBMR.current.style.display = 'none'}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BMRCalculator;