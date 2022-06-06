import React from 'react';
import BMICalculator from '../components/BMICalculator/BMICalculator';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function BMI() {
  return (
    <>
        <Header />
        <BMICalculator />
        <Footer />
    </>
  )
}

export default BMI;