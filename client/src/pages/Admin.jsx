import React from 'react';
import Admin from '../components/Admin/Admin';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function BMI() {
  return (
    <>
        <Header />
            <Admin />
        {/* <Footer custom={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} /> */}
    </>
  )
}

export default BMI;