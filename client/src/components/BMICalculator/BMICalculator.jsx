import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './style.css';

function BMICalculator() {
  const [sex, setSex] = useState('Nam');
  const bmiNumber = useRef(), bmiGenre = useRef(), infoBMI = useRef(), formRef = useRef();
  const initialValues = {
    weight: '',
    height: ''
  }
  const validationSchema = Yup.object().shape({
    weight: Yup.number()
            .required("Bạn chưa nhập cân nặng")
            .typeError('Cân nặng phải là chữ số')
            .positive('Cân nặng phải lớn hơn 0'),
    height: Yup.number()
            .required("Bạn chưa nhập chiều cao")
            .typeError('Chiều cao phải là chữ số')
            .positive('Chiều cao phải lớn hơn 0')
  });

  function handleGenreBMI(value) {
      if(value < 18.5) return 'Gầy';
      else if(value >= 18.5 && value <= 24.9) return 'Bình thường';
      else if(value >= 25 && value <= 29.9) return 'Tăng cân';
      else if(value >= 30 && value <= 34.9) return 'Béo phì độ 1';
      else if(value >= 35 && value <= 39.9) return 'Béo phì độ 2';
      else return 'Béo phì độ 3';  
  }
  function handleSubmit() {
    infoBMI.current.style.display = 'flex';
    const a = document.querySelector('#weightInfo').value, b = document.querySelector('#heightInfo').value;
    const result = a / (b * 0.01 * 2);
    const genre = handleGenreBMI(result.toFixed(1));
    bmiNumber.current.textContent = result.toFixed(1);
    bmiGenre.current.textContent = genre;
  }

  return (
    <>
      <div>
        <section>
          <div className="container">
            <div className="jumbotron p-3 p-md-5 text-white rounded bg-warning">
              <div className="col-md-6 px-0">
                <h1 className="display-4 font-italic">Tính Chỉ Số BMI</h1>
                <p className="text-danger">
                  Sử dụng công cụ này để kiểm tra chỉ số khối cơ thể (BMI) để
                  biết bạn có đang ở mức cân nặng hợp lý hay không. Bạn cũng có
                  thể kiểm tra chỉ số BMI của trẻ tại đây.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="jumbotron text-center">
                  Mời bạn nhập thông tin cần thiết để tính
                </h3>
                <div className="form-group">
                    <div className="radio">
                      <label>
                        <input
                          type="radio"                    
                          value="Nam"
                          name="gioitinh"
                          onChange={e => setSex(e.target.value)}
                          checked={sex === 'Nam' ? true : false}
                        />
                        <span className="label label-danger" style={{marginLeft: '.6rem'}}>Nam</span>
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input
                          type="radio"                
                          value="Nữ"
                          name="gioitinh"
                          onChange={e => setSex(e.target.value)}
                          checked={sex === 'Nữ' ? true : false}
                        />
                        <span className="label label-success" style={{marginLeft: '.6rem'}}>Nữ</span>
                      </label>
                    </div>
                  </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  <Form id="metric" ng-show="units == 'imperial'" ref={formRef}>
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
                      <label htmlFor="weight_foot">Chiều Cao (cm)</label>
                      <Field                  
                        placeholder="Chiều Cao (cm):"
                        id="heightInfo"
                        className="form-control input_height"
                        name="height"              
                        style={{fontSize: '1.4rem', textIndent: '1.2rem'}}
                      />
                      <ErrorMessage name="height" component="span" style={{display: 'block', color: 'red', textAlign: 'left', marginTop: '.6rem', fontSize: '1.4rem'}} />
                    </div>
                    <button className="btn_BMI" type="submit">Tính</button>
                  </Form>
                </Formik>
              </div>   
            </div>
          </div>
        </section>
      </div>
      <div style={{display: 'none'}} className="blur" ref={infoBMI}>
        <div className="blur_overllay"></div>
        <div className="alert_calculate">
            <div className="blur_overllay"></div>
            <div className="alert_calculate">    
                <div>
                    <span style={{fontWeight: 'bold', color: 'green'}} className="alert_calculate-text">Chỉ số BMI</span>
                    <span className="alert_calculate-text bmiNumber" ref={bmiNumber}></span>
                    <span style={{fontWeight: 'bold', color: 'green'}} className="alert_calculate-text">Bạn thuộc loại</span>
                    <span className="alert_calculate-text bmiGenre" ref={bmiGenre}></span>
                    <button className="alert_calculate-btn" onClick={() => infoBMI.current.style.display = 'none'}>OK</button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default BMICalculator;
