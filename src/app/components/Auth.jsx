"use client"
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import Signup from "../assets/signup.jpg"


const cookies = new Cookies();

const initialState = {
  fullName: "",
  userName: "",
  phoneNumber: "",
  avatarURL: "",
  password: "",
  conformPassword: "",
};

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState(initialState);

  const handelChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, userName, password, phoneNumber, avatarURL } = formData;
    const URL = process.env.NEXT_PUBLIC_API_URL;
  
    try {
      const response = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
        userName,
        password,
        ...(isSignup && { fullName, phoneNumber, avatarURL })  
      });
  
      const { token, userId, fullName: returnedFullName, hashedPassword } = response.data;

      cookies.set('token', token);
      cookies.set('userName', userName);
      cookies.set('fullName', isSignup ? fullName : returnedFullName);
      cookies.set('userId', userId);
      
      if (isSignup) {
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error in authentication:", error);
    }
  };
  
  const switchMode = (e) => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handelChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                name="userName"
                placeholder="User Name"
                onChange={handelChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handelChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar Link</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="Avatar Link"
                  onChange={handelChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handelChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="conformPassword">Conform Password</label>
                <input
                  type="password"
                  name="conformPassword"
                  placeholder="Password"
                  onChange={handelChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? " Sign In" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <Image src={Signup} alt="Signup" />
      </div>
    </div>
  );
};

export default Auth;