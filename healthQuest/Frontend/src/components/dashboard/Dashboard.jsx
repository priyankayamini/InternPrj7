import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Chart from "react-apexcharts";
import Cal from './Cal';
import Reminder from './Reminder';
import notificationSound from '../images/notify.mp3';
import Nutrition from './Nutrition';
 

import BMICalculator from './BMICalculator';
import Macro from './Macro';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const first_name = useSelector(state => state.first_name);
    const last_name = useSelector(state => state.last_name);

  

  

    const handleLogOut = () => {
        sessionStorage.clear();
        navigate("/");
        dispatch({ type: "ISlOGGEDOUT" });
    };
    
    return (
        <div>
            <section className='py-5 hero-bg1'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='m-2 py-5'>
                                <h2 className='text-white'>Welcome</h2>
                                <ul className='list-inline d-flex mb-0'>
                                    <li style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }} onClick={handleLogOut}>
                                        {first_name} {last_name}
                                    </li>
                                </ul>
                                <p className='text-white lead'>Explore all Our Fitness Tracking Facilities </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*end of the section*/}
            <section className='pt-5'>
                <div className='container'>
                    <div className='row justify-content-evenly'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                           <h3 className='text-dark text-center'>
                            Select Your Weight Category so that we can suggest Diet and Activity Plan..!
                           </h3>
                            
                        </div>
                     
                    </div>
                </div>
            </section>
           
            <Nutrition/>
          
         
        </div>
    );
}

export default Dashboard;
