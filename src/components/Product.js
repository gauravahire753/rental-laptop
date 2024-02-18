import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/Slices/cartSlice";
import "react-toastify/dist/ReactToastify.css";


const Product = ({ item }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(item));
  }; 

  const removeFromCart = () => {
    dispatch(remove(item.id));
  };

  return (
    <div className="bg-white flex items-center hover:shadow-2xl pb-8 relative mb-4 rounded-md hover:scale-105 transition-all duration-300 shadow-lg lg:w-[24%]  md:w-[40%] sm:w-[80%] overflow-hidden box-border">
      <div className="flex justify-center flex-col items-center gap-2  p-5  box-border">
        <h2 className="text-lg font-bold">
          {item.title.length > 15
            ? item.title.substring(0, 20) + " ..."
            : item.title}
        </h2>
        <p className="text-xs opacity-90 ">
          {item.description.length > 40
            ? item.description.substring(0, 105) + " ..."
            : item.description}
        </p>
        <div className="w-44 h-44 overflow-hidden">
          <img
            src={item.image}
            alt="img"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex gap-14 justify-center items-center w-full absolute bottom-3">
          <p className="text-green-700 font-bold text-sm">Rs{item.price}</p>

          {cart.some((p) => p.id === item.id) ? (
            <button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
              onClick={removeFromCart}
            >
              Remove Item
            </button>
          ) : (
            <button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
