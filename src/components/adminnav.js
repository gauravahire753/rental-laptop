import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { getAuth , signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../utils/firebaseConfig"


const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const [logindata, setLoginData] = useState([]);

  const history = useNavigate();

  // check if user authenticated
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (user) {
    console.log('User email:', user);
  } else {
    console.log('No user is currently signed in.');
    history("/login");
  }

  

  const [show, setShow] = useState(false);

  var todayDate = new Date().toISOString().slice(0, 10);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Birthday = () => {
    const getuser = localStorage.getItem("user_login");
    if (getuser && getuser.length) {
      const user = JSON.parse(getuser);

      setLoginData(user);

      const userbirth = logindata.map((el, k) => {
        return el.date === todayDate
      });

      if (userbirth) {
        setTimeout(() => {
          console.log("ok");
          handleShow();
        }, 3000)
      }
    }
  }

  const userlogout = () => {
    signOut(auth)
    .then(() => {
      console.log('User logged out successfully');
      history("/login");
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
    
  }
  const additem =()=>{
    history("/login/admin/additem")
   }
  const updatelocation =()=>{
     history("/login/admin/location")
  }
  useEffect(() => {
    Birthday();
  }, [])

  return (
    <div style={{ background: "#333", color: "white", height: "50px", display: "flex", position: "fixed", width: "100%", top: "0", zIndex: "1000" }}>
      <div style={{ width: "75%", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "left", gap: "2rem", textDecoration: "none" }}>
            <p className="text-xl uppercase">
              <span className="text-3xl text-green-400">M</span>ag Laptop Rental Services
            </p>
            <p className="text-xl">
              <span className="text-3xl text-400">Admin </span>
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Button onClick={updatelocation}>Update location</Button>
        <Button onClick={additem}>Additem</Button>
          <Button onClick={userlogout}>LogOut</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;