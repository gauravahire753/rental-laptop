import React, { useState, useEffect } from "react";
import Product2 from "./Product2";
import Spinner from "./Spinner";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../utils/firebaseConfig";
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const app = initializeApp(firebaseConfig);

const Adminitem = () => {
  const history = useNavigate();
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

      console.log(data)

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  const getData = async () => {
    setLoading(true);
    try {
      // Fetch data from the API or Firebase
      const data = await fetchDataAsJson();
      console.log(data)

      await setItems(data)
      console.log(items)

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (itemId) => {
    const firestore = getFirestore(app);
    const productRef = doc(firestore, "products", itemId);
    try {
      // Delete the item from Firestore
      await deleteDoc(productRef);
      // Fetch updated data after deletion
      getData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "30px", zIndex: "10" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Spinner />
          </div>
        ) : items.length > 0 ? (
          <div style={{ background: "#f0f0f0", width: "100%", height: "100%" }}>
            <div style={{ width: "75%", margin: "auto", paddingTop: "30px", display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-between" }}>
              {items.map((item) => (

                <Product2 key={item.id} item={item} onDelete={handleDelete} />

              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p>No Data Found. Please add items.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adminitem;