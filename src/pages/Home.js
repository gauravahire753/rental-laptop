import { useState, useEffect } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Navbar from '../components/Navbar';

import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../utils/firebaseConfig"
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDataAsJson = async () => {
    const firestore = getFirestore(app);
    const collectionRef = collection(firestore, "products");
  
    try {
      const querySnapshot = await getDocs(collectionRef);
  
      const data = [];
  
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
  
      
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  async function getData() {
    setLoading(true);
    try {
      const url = await fetch(API_URL);
      //  Work here
      const data = await fetchDataAsJson()
      
      console.log(data)
      
      
      const output = await url.json();
      console.log(output)


      setItems(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "30px", zIndex: "10" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Spinner />
          </div>
        ) : items.length > 0 ? (
          <div style={{ background: "#f0f0f0", width: "100%", height: "100%" }}>
            <div style={{ width: "75%", margin: "auto", paddingTop: "30px", display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-between" }}>
              {items.map((item) => (
                <Product key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p>No Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
