

import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { _post } from '../services';
import RectangleImage from '../components/images/Rectangle.png';
import womenCard from '../components/images/tt.png';

const SignUp = () => {
  const navigate = useNavigate();
  const dataFields = {
    first_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    designation: "",
    course: "",
    image: null
  };

        const [data, setData] = useState(dataFields);
        const [errorMsg, setErrorMsg] = useState("");
        const [imagePreview, setImagePreview] = useState('');

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            const allowedTypes = ['image/jpeg', 'image/png'];

            if (file && allowedTypes.includes(file.type)) {
            setData({ ...data, image: file });
            setImagePreview(URL.createObjectURL(file));
            setErrorMsg('');
            } else {
            alert('Please select a valid JPG or PNG image file.');
            setData({ ...data, image: null });
            setImagePreview('');
            setErrorMsg('Please upload only JPG or PNG files.');

            }
        };
      const  handleChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value });
            // const newValue = e.target.value;
           
            // const NumericInput = () => {
            //     const [value, setValue] = useState('');
            // } 
            // if (value === 'phone_number' && !/^\d{0,10}$/.test(value)) {
            //     //return; // Prevent updating state if the input is not a valid number with up to 10 digits
            //     setValue(newValue);
            
            // }  
     
        };
        const handleRegistration = (e) => {
            e.preventDefault();
            const { password, confirm_password, image } = data;

            if (password !== confirm_password) {
            setErrorMsg("Passwords do not match");
            return;
            }

            const formData = new FormData();
            Object.keys(data).forEach(key => {
            if (key !== 'image') formData.append(key, data[key]);
            });

            if (image) formData.append('image', image);

            _post("register", formData)
            .then(response => {
                if (response.status) {
                alert(response.message);
                navigate("/login");
                setErrorMsg("");
                setData(dataFields);
                setImagePreview('');
                } else {
                alert(response.message);
                }
            })
            .catch(error => {
                alert("Error: ", error.response?.data?.message || "An error occurred");
            });
        };

  return (
    <section className="loginBg py-5">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <h4 className='text-start text-white pt-2 text-center'>Start your journey with us!<br />Fill out the form and start exploring</h4>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div className="p-5 text-center">
              <Fragment>
                <div className='registration p-5'>
                  <div className='registration_content'>
                    <div className='text-start pb-2'>
                      <h4 className='text-white'>Register to Login!</h4>
                    </div>
                    <form onSubmit={handleRegistration}>
                      <div className="mb-2 text-start">
                        <div className='my-2'>
                          <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="First Name"
                            name='first_name'
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="my-2 text-start">
                        <input
                          type="email"
                          className="form-control rounded-pill"
                          placeholder="Email"
                          name='email'
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="my-2 text-start">
                        <input
                          type="password"
                          className="form-control rounded-pill"
                          placeholder="Password"
                          name='password'
                          onChange={handleChange}
                          required
                        />
                        <br />
                        <div>
                          <input
                            type="password"
                            className="form-control rounded-pill"
                            placeholder="Confirm Password"
                            name='confirm_password'
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="my-2 number-start">
                        <input
                          type="text"
                          className="form-control rounded-pill"
                          placeholder="Phone Number"
                          name='phone_number'
                          onChange={handleChange}
                          maxLength={10}
                          required
                        />
                      </div>
                      <div className="my-2 designation-dropdown">
                        <select
                          className="form-control rounded-pill"
                          name="designation"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Designation</option>
                          <option value="hr">HR</option>
                          <option value="manager">Manager</option>
                          <option value="sales">Sales</option>
                        </select>
                      </div>
                      <div className="my-2 number-start">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Course"
                          name='course'
                          onChange={handleChange}
                          required
                        />
                        <div className="my-2 course-checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="course_checkbox"
                              value="mba"
                              onChange={handleChange}
                            />
                            MBA
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="course_checkbox"
                              value="bba"
                              onChange={handleChange}
                            />
                            BBA
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="course_checkbox"
                              value="bsc"
                              onChange={handleChange}
                            />
                            BSc
                          </label>
                        </div>
                      </div>
                      <div className="my-2 number-start">
                        <input
                          type="file"
                          accept="image/jpeg, image/png"
                          className="form-control rounded-pill"
                          placeholder="Image"
                          name='image'
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                      <div>
                        {/* {imagePreview && (
                          <div>
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                          </div>
                        )} */}
                        {errorMsg && <p className='mb-0' style={{ fontSize: "12px", color: "red" }}>{errorMsg}</p>}
                      </div>
                      <div className='text-center'>
                        <button className='btn btn-outline-dark mt-3 w-100 rounded-pill px-5 py-2'>Submit</button>
                      </div>
                      <p className='text-white mt-3'>Already have an account? <a href='/login' className='text-white fw-bold'>Click here</a> to Login</p>
                      <p className='text-white mt-3'>
                        Visit Our pages
                      </p>
                      <div className='d-flex justify-content-center'>
                        <div className='px-2'>
                          <a href=''>
                            <i className="fa fs-4 fa-facebook" aria-hidden="true"></i>
                          </a>
                        </div>
                        <div className='px-2'>
                          <a href=''>
                            <i className="fa fs-4 fa-instagram" aria-hidden="true"></i>
                          </a>
                        </div>
                        <div className='px-2'>
                          <a href=''>
                            <i className="fa fs-4 fa-twitter" aria-hidden="true"></i>
                          </a>
                        </div>
                        <div className='px-2'>
                          <a href=''>
                            <i className="fa fs-4 fa-linkedin" aria-hidden="true"></i>
                          </a>
                        </div>
                        <div className='px-2'>
                          <a href=''>
                            <i className="fa fs-4 fa-youtube" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
