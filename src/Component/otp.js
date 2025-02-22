import React, { useState } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
const OTPEntry = () => {
    
  const [otp, setOtp] = useState([null, null, null, null]); // Initialize with null (for numbers)

  // Handle input change
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) { // Only allow a single digit input
      const newOtp = [...otp];
      newOtp[index] = value ? parseInt(value, 10) : null; // Convert to number or null if empty
      setOtp(newOtp);

      // Move focus to the next input
      if (value.length === 1 && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      } else if (value.length === 0 && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpData = otp.join('');  // Concatenate the digits as a string
    const otpNumber = parseInt(otpData, 10);  // Convert to a number
    
    if (isNaN(otpNumber)) {
      alert('Please enter a valid OTP');
      return;
    }

    console.log('OTP Submitted:', otpNumber);

    try {
      // Make the POST request to localhost:5000
      const response = await axios.post('http://localhost:5000/otp', { otp: otpNumber });
      if(response.data.message === 'Account created successfully'){
        alert("Account created successfully");
        window.location.href = '/';
      }
      else{
        alert("Entered otp not matched");
      }
    } catch (error) {
      console.error('Error submitting OTP:', error);
      alert('Error submitting OTP');
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <Header/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)' }}>
        <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', textAlign: 'center' }}>
          <h2>Enter OTP</h2>
          <form id="otpForm" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  value={value !== null ? value : ''}
                  onChange={(e) => handleInputChange(e, index)}
                  maxLength="1"
                  id={`otp-input-${index}`}
                  style={{
                    width: '50px',
                    height: '50px',
                    margin: '0 5px',
                    textAlign: 'center',
                    fontSize: '1.5em',
                    border: '2px solid #4caf50',
                    borderRadius: '5px',
                    backgroundColor: '#ffffff',
                    color: '#000',
                  }}
                />
              ))}
            </div>
            <br />
            <input
              type="submit"
              value="Submit"
              style={{
                backgroundColor: '#4caf50',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '1em',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                transition: 'background-color 0.3s, box-shadow 0.3s',
              }}
            />
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default OTPEntry;
