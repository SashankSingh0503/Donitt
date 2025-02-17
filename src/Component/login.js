import React from 'react';
import Header from "./header";
import Footer from "./footer";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';  
import "./login.css";

// Validation Schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

function Login() {
  return (
    <div id="Login-main">
      <Header />
      <div className="form-container">
        <h2>Sign Up</h2>
        <Formik
          initialValues={{ username: '', password: '', role: 'customer' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            try {
              console.log(values);
              axios.post("http://localhost:5000/login", values, {
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .then(response => {
                if(response.data === "Matched"){
                  document.getElementById("Invalid").innerText = "";
                  window.location.href="/";
                }
                else{
                  document.getElementById("Invalid").innerText = "Invalid crentials..";
                }
              })
              .catch(error => {
                console.error("Error Happened: " + error);
              });
            } catch (err) {
              console.error("Unexpected error: " + err);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form id="signupForm">
              <div className="toggle-container">
                <label htmlFor="roleToggle">Login as: {values.role === 'customer' ? 'Customer' : 'Delivery Person'}</label>
                <label className="slider">
                  <Field
                    type="checkbox"
                    id="roleToggle"
                    name="roleToggle"
                    onChange={() => setFieldValue('role', values.role === 'customer' ? 'deliveryPerson' : 'customer')}
                  />
                  <span className="slider-round"></span>
                </label>
                <span>{values.role === 'customer' ? 'Delivery Person' : 'Customer'}</span>
              </div>

              <div>
                <label htmlFor="username">Enter the registered name</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  required
                />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  required
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <p style={{color:'red' , fontFamily:'cursive'}} id="Invalid"></p>
              <button type="submit">Sign Up</button>
            </Form>
          )}
        </Formik>

        <div className="links">
          <a href="/forgotPassword">Forgot Password?</a>
          <p>Don't have an account? <a href="/signup">Create here</a></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;