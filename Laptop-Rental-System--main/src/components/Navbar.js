import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {  useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { getAuth , signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../utils/firebaseConfig"

const Navbar = () => {
  const { cart } = useSelector((state) => state);
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

  return (
    <div style={{ background: "#333", color: "white", height: "50px", display: "flex", position: "fixed", width: "100%", top: "0", zIndex: "1000" }}>
      <div style={{ width: "75%", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>



        <div>
          <div style={{ display: "flex", alignItems: "left", gap: "2rem", textDecoration: "none" }}>
            <p className="text-xl uppercase">
              <span className="text-3xl text-green-400">M</span>ag Laptop Rental Services
            </p>
            <p className="text-xl">
              <span className="text-3xl text-400">{user.email}</span>
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button onClick={userlogout}>LogOut</Button>
          <NavLink to="/login/Home/mycart" style={{ textDecoration: "none" }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <AiOutlineShoppingCart style={{ fontSize: "2rem" }} />
              {cart.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                    backgroundColor: "#34d399",
                    color: "white",
                    fontSize: "0.8rem",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    animation: "bounce 1s infinite",
                  }}
                >
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
