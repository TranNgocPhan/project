import React, { useState, useEffect } from "react";
import { setCookie, getCookie } from '../../cookie/cookieHandler';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

function CategoryDetail() {
  const idCategory = getCookie('numCategory');
  const [category, setCategory] = useState('');
  const [post, setPost] = useState([]);
  const [imageIllness, setImageIllness] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3001/Category/getCategoryByID/${idCategory}`);
      setCategory(data[0]);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3001/Category/getPostByCategoryID/${idCategory}`);
      setPost(data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3001/Illness/getIllnessImage`);
      setImageIllness(data);
    }
    fetchData();
  }, []);

  return (
    <>
      {category !== '' && post.length >= 1 && imageIllness.length >= 1 &&
          <section className="section service-2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center">
                <div className="section-title">
                  <h2>{category.tenChuyenMuc}</h2>
                  <div className="divider mx-auto my-4" />
                  <p>
                    {category.moTa}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              {post.map((obj,index) =>
                <div className="col-lg-4 col-md-6 " key={obj.maBenh}>
                  <div className="department-block mb-5">
                    <img
                      src={require(`../../../public/images/dtb/${imageIllness[index].anh}`)}
                      alt=""
                      className="img-fluid w-100"
                    />
                    <div className="content">
                      <h4 className="mt-4 mb-2 title-color">
                        <Link to="/Illness" onClick={() => setCookie('numPost', obj.maBenh)}>{obj.tieuDeBenh}</Link>
                      </h4>
                      <p className="mb-4">
                        {`${obj.chiTietBenh.slice(0, 160)}...`}
                      </p>
                    </div>
                  </div>
                </div> 
              )}
            </div>
          </div>
        </section>
      }
    </>
  );
}

export default CategoryDetail;
