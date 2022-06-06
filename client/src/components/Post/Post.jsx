import React, { useState, useEffect, useRef }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCookie, getCookie } from '../../cookie/cookieHandler';
import Header from '../Header/Header';
import { checkSearch } from '../../handleFunction';
import { store } from '../../store';

import './style.css';

function Post() {
    const { postList, searchValue } = store.getState();
    const [imageIllness, setImageillness] = useState([]);
    const [post, setPost] = useState([]);
    const [search, setSearch] = useState('');
    const headerRef = useRef(), searchIllnessRef = useRef();

    useEffect(() => {
      headerRef.current.hideSearch();
    },[]);
    useEffect(() => {
      setPost(postList);
      setSearch(searchValue);
    }, []);
    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.get(`http://localhost:3001/Illness/getIllnessImage`);
        setImageillness(data);
      }
      fetchData();
    }, []);
    async function handleSearch(e) {
      if(e.key === 'Enter') {
        if(e.target.value.includes(' ')) {
          const valueArray = e.target.value.split(' ');
          let idCM = 0;
          for(let value of valueArray) {
            if(checkSearch(value) != 0) {
              idCM = checkSearch(value);
              break;
            }
          }
          if(idCM != 0) {       
            const { data } = await axios.get(`http://localhost:3001/Post/${idCM}`);
            setPost(data);
            setSearch(e.target.value); 
          }
          else {
            setPost('');
            setSearch('');
          }       
        }
        else {
          let idCM1 = checkSearch(e.target.value);
          const respone = await axios.get(`http://localhost:3001/Post/${idCM1}`);
          if(idCM1 != 0) {
            setPost(respone.data);
            setSearch(e.target.value);
          }
          else {
            setPost('');
            setSearch('');
          }
        }
      }
    }

    return (
        <>
              <Header ref={headerRef} />
              <div className="box-container" style={{width: '80%', textAlign: 'center'}}>
                <div className="illness_content-header">
                  <div className="illness_search">
                    <i className="fas fa-search" />
                    <input className="illness_search-input" type="text" style={{outline: 'none', border: 'none'}} placeholder="Tìm theo triệu chứng hoặc theo bệnh" ref={searchIllnessRef} onKeyDown={handleSearch} />
                  </div>
                </div>
                <p className="illness_text" style={{fontWeight: 'bold', fontSize: '3rem'}}>{search}</p>
                <p className="illness_text" style={{color: '#939393', fontSize: '1.8rem'}}>{post.length >= 1 ? `Có ${post.length} kết quả được tìm thấy` : 'Có 0 kết quả được tìm thấy'}</p>
              </div>
              <div>
                <section className="section1 service-2">
                  <div className="container" >
                    <div className="row">
                      {(post.length >= 1 && imageIllness.length >= 1) ? post.map((obj, index) =>                                                   
                        <div className="col-lg-4 col-md-6 ">
                          <Link className="department-block mb-5" to="/Illness" onClick={() => setCookie('numPost', obj.maBenh)}>
                            <img src={require(`../../../public/images/dtb/${imageIllness[obj.maBenh - 1].anh}`)} alt="" className="img-fluid w-100" />
                            <div className="content">
                              <h3 className="mt-4 mb-2 title-color" style={{lineHeight: '2.6rem'}}>{obj.tieuDeBenh}</h3>
                              <p className="mb-4">{`${obj.chiTietBenh.slice(0, 178)}....`}</p>
                            </div>
                          </Link>
                        </div>                                                                      
                      )
                        : <span style={{position: 'absolute', color: '#939393', top: '35vh', left: '40%', fontSize: '3rem'}}>Không tìm thấy bài viết nào</span>        
                      }
                    </div>
                  </div>
                </section>
              </div>
        </>
    );
}

export default Post;