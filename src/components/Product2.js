
import React from "react";
const Product2 = ({ item, onDelete }) => {
  const handleDelete = () => {
    // Delete function with the item ID
    onDelete(item.id);
  };

  return (
    <div  className="bg-white flex items-center hover:shadow-2xl  relative mb-4 rounded-md hover:scale-105 transition-all duration-300 shadow-lg lg:w-[24%]  md:w-[40%] sm:w-[80%] overflow-hidden box-border">
      <div className=" bg-white flex justify-center flex-col items-center gap-2  p-5  box-border">
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
            <button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
              onClick={handleDelete}
            >
             Delete
            </button>
                   </div>
      </div>
    </div>
  );
};

export default Product2 ;
