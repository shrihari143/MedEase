import React from 'react'
import { useSelector } from "react-redux";
import Layout from '../components/Layout';
import { useNavigate } from "react-router-dom";

const Myprofile = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const getCurrentDateTime = () => {
      const options = { timeZone: 'Asia/Kolkata' };
      return new Date().toLocaleString('en-IN', options);
    };
  return (
    <Layout>
    
    <div
        className="card m-2 abc"
        
      >
        <div className="card-header">
           <h2>My Profile</h2>
           <p>
            <b>Date and Time :</b> {getCurrentDateTime()}
          </p>
          
        </div>
        <div className="card-body">
        <p>
          <img src={user.image} alt="User" style={{ width: '100px', height: '100px', marginRight: '10px' }} />
        </p>
        <p>
            
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          
          <button className="doctorlist"style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}>Return to Home page</button>
        </div>
      </div>
    </Layout>
  )
}

export default Myprofile;