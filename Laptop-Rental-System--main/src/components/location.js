import React from 'react'
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import SIgn_img from './SIgn_img'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../utils/firebaseConfig"
import { getFirestore, doc, getDocs, collection, where, query, updateDoc,  } from 'firebase/firestore';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 19.1947316586337, lng: 73.85495126683931 };
const DefaultZoom = 10;


const Location = () => {

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const history = useNavigate();

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }



    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }



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


    //get current location from firebase
    const firestore = getFirestore(app);
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection, where('uid', '==', user.uid));


    const getCurrLoc = () => {
        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // Access the document data using doc.data()
                    const data = doc.data();
                    console.log('Document data:', data);
                    return {
                        lat: isNaN(parseFloat(data.lat) ? 0 : parseFloat(data.lat)),
                        lng: isNaN(parseFloat(data.log) ? 0 : parseFloat(data.log))
                    }

                });
            })
            .catch((error) => {
                console.error('Error fetching document:', error);
            })
    }


    function handleSaveLocation() {
        console.log(location.lat)
        console.log(location.lng)

        // Function to update the document
        const firestore = getFirestore(app);

        let docId;

        const usersCollection = collection(firestore, 'users');
        const q = query(usersCollection, where('uid', '==', user.uid));
        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc1) => {
                    // Access the document data using doc.data()
                    const data = doc1.data();

                    docId = doc1.id
                    console.log(doc1.id)

                    const documentRef = doc(firestore, 'users', docId);
                    updateDoc(documentRef, {
                        lat: location.lat,
                        log: location.lng,
                    }).then(() => {
                        console.log('Document updated successfully');
                        back()
                    }).catch((error) => {
                        console.error('Error updating document:', error);
                    });

                });
            })
            .catch((error) => {
                console.error('Error fetching document:', error);
            })


    }





    const back = () => {
        history("/login/admin")
    }
    const userlogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User logged out successfully');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
        localStorage.removeItem("user_login")
        history("/login");
    }
    return (
        <>

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

                        <Button onClick={back}>Back</Button>
                        <Button onClick={userlogout}>LogOut</Button>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>

                        dfghfghfg
                        <>

                            <label>Latitute:</label><input type='text' value={location.lat} disabled />
                            <label>Longitute:</label><input type='text' value={location.lng} disabled />
                            <label>Zoom:</label><input type='text' value={zoom} disabled />

                            <MapPicker defaultLocation={defaultLocation}
                                zoom={zoom}
                                mapTypeId="roadmap"
                                style={{ height: '700px' }}
                                onChangeLocation={handleChangeLocation}
                                onChangeZoom={handleChangeZoom}
                                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
                            <button onClick={handleSaveLocation}>Save Location</button>
                        </>

                    </div>
                </section>
            </div>

        </>
    )

}
export default Location;