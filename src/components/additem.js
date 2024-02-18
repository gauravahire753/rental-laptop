import { useState } from 'react'
import SIgn_img from './SIgn_img'
import { useNavigate } from 'react-router-dom'
import { getAuth , signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../utils/firebaseConfig"
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Additem = () => {
  const history = useNavigate();
  const back =()=>{
    history("/login/admin")
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

  const [inpval, setInpval] = useState({
    itemtitle: "",
    desc: "",
    price: "",
    url: "",
  });

  // Firebase initialization
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;

  // Function to handle form input changes
  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const addData = async (e) => {
    e.preventDefault();
  
    const { itemtitle, desc, price, url } = inpval;
  
    if (!itemtitle || !desc || !price || !url) {
      toast.error("All fields are required!", {
        position: "top-center",
      });
      return;
    }
  
    console.log(itemtitle);
    console.log(desc);
    console.log(price);
    console.log(url);
  
    // Check if user is logged in
    if (!user) {
      toast.error("User not logged in!", {
        position: "top-center",
      });
      return;
    }
  
    // All data is valid now add it to Firebase
    const firestore = getFirestore(app);
  
    try {
      await addDoc(collection(firestore, "products"), {
        by: user.uid,
        category: "Electronics",
        description: desc,
        image: url,
        price: price,
        title: itemtitle,
        rate: 5,
        count: 1,
      });
  
      toast.success("Item added successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
  
      // Use the navigate function to redirect to a different route
      history("/login/admin");
    } catch (error) {
      console.error("Error adding document:", error);
      toast.error("Failed to add item. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  
    return (<><div style={{ background: "#333", color: "white", height: "50px", display: "flex", position: "fixed", width: "100%", top: "0", zIndex: "1000" }}>
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
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    
      <Button onClick={back}>Back</Button>
        <Button onClick={userlogout}>LogOut</Button>
      </div>
    </div>
  </div>
   <div className="container mt-3">
   <section className='d-flex justify-content-between'>
       <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
           <h3 className='text-center col-lg-6'>Add New Items</h3>
           <Form >
               <Form.Group className="mb-3 col-lg-6" controlId="itemtile">
                   <Form.Control type="text" name='itemtitle' onChange={getdata} placeholder="Item Name" />
               </Form.Group>
               <Form.Group className="mb-3 col-lg-6" controlId="desc">

                   <Form.Control type="text" name='desc' onChange={getdata} placeholder="Enter Description of Item" />
               </Form.Group>

               <Form.Group className="mb-3 col-lg-6" controlId="price">

                   <Form.Control onChange={getdata} name='price' type="number"  placeholder="Enter Price"/>
               </Form.Group>

               <Form.Group className="mb-3 col-lg-6" controlId="image">

                   <Form.Control type="url" name='url' onChange={getdata} placeholder="Enter The Url Of Image" />
               </Form.Group>
               <Button variant="primary" className='col-lg-6' onClick={ addData } style={{ background: "rgb(67, 185, 127)" }} type="submit">
                   Add This Item 
               </Button>
           </Form>
           
       </div>
       <SIgn_img />
   </section>
   <ToastContainer />
</div>
</>
)
};
export default Additem;

