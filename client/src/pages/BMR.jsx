import React from 'react';
import BMRCalculator from '../components/BMRCalculator/BMRCalculator';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function BMR() {
  return (
    <>
        <Header />
        <BMRCalculator />
        <Footer />
    </>
  )
}

export default BMR;