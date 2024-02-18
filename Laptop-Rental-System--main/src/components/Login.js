import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../utils/firebaseConfig"
import { getFirestore, doc, getDocs, collection, where, query } from 'firebase/firestore';

const Login = () => {

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        email: "ab@cd.efg",
        password: "12345678"
    })

    const [data, setData] = useState([]);
    console.log(inpval);

    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }

    const addData = (e) => {
        e.preventDefault();

        const getuserArr = localStorage.getItem("useryoutube");
        console.log(getuserArr);

        const { email, password } = inpval;
        if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('plz enter valid email addres', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('password field is requred', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('password length greater five', {
                position: "top-center",
            });
            if (email === "ab" & password === 12345) {
                history("/login/Home")
            };
        } else {


            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            // Initialize Firebase Authentication and get a reference to the service
            const auth = getAuth(app);

            // Sign in the user with email and password
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential.user.email);
                    console.log(userCredential.user.uid);

                    // Check user role
                    const firestore = getFirestore(app);
                    console.log("re0");
                    const usersCollection = collection(firestore, 'users');
                    console.log("re1");
                    const q = query(usersCollection, where('uid', '==', userCredential.user.uid));
                    console.log("re2");
                    getDocs(q)
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                // Access the document data using doc.data()
                                const data = doc.data();
                                console.log("re3");
                                if(data?.role == "shop"){
                                    history("/login/admin")
                                } else{
                                    console.log("re4");
                                    history("/login/Home")
                                }
                                console.log('Document data:', data);
                            });
                        })
                        .catch((error) => {
                            console.error('Error fetching document:', error);
                        })





                    

                })
                .catch((e) => {
                    console.log("Error" + e);

                })

        }

    }

    return (
        <><Header />
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign IN</h3>
                        <Form >

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            <NavLink to="/login/Home"> <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button> </NavLink>
                        </Form>
                        <p className='mt-3'>Create New Account<span><NavLink to="/"class="text-decoration-none" > SignUP </NavLink></span> </p>
                    </div>
                    <SIgn_img />
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login