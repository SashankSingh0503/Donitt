import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./signup.css";
import Header from "./header";
import Footer from "./footer";

function Signup() {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      reg: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Full Name is required'),
      phone: Yup.string().matches(/^\d{10}$/, 'Phone number is not valid').required('Phone number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
      reg: Yup.string().matches(/^\d+$/, 'Registration number must be a number').required('Registration number is required')
    }),
    onSubmit: (values) => {
      axios.post('http://localhost:5000/accountCreation', values) 
        .then(response => {
          console.log('Account created successfully!', response);
          window.location.href="login";
        })
        .catch(error => {
          console.error('There was an error creating the account!', error);
        });
    }
  });

  return (
    <div style={{ backgroundColor: "black" }}>
      <Header />

      <div className="signin-body">
        <div className="form-container">
          <h2 className="form-heading">Create Account</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name" className="label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}

            <label htmlFor="phone" className="label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="input"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : null}

            <label htmlFor="email" className="label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}

            <label htmlFor="reg" className="label">Registration Number</label>
            <input
              type="number"
              id="reg"
              name="reg"
              className="input"
              value={formik.values.reg}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.reg && formik.errors.reg ? (
              <div className="error">{formik.errors.reg}</div>
            ) : null}

            <button type="submit" className="button">
              Create Account
            </button>
          </form>

          <div className="links">
            <p className="text-center">
              Already have an account?{' '}
              <a href="/login" className="link">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;