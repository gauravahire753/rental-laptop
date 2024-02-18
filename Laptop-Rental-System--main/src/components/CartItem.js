import React from "react";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed", { position: toast.POSITION.TOP_CENTER });
  };

  return (
    <div>
      <div style={{ borderBottom: "1px solid black", padding: "10px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "150px", height: "150px" }}>
            <img src={item.image} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="product" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "47%" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{item.title}</h1>
            <p style={{ fontSize: "0.8rem", opacity: "0.9" }}>{item.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ color: "#1f9d55", fontWeight: "bold", fontSize: "0.8rem" }}>Rs{item.price}</p>
              <button onClick={removeFromCart} style={{ padding: "10px", color: "red", fontSize: "1.5rem", backgroundColor: "#e0e0e0", borderRadius: "50%" }}>
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
