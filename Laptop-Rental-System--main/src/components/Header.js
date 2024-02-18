import React from 'react'
// import './header.css'

const Header = () => {
    return (
        <>
            <div style={{ background: "#333", color: "white", height: "50px", display: "flex", position: "fixed", width: "100%", top: "0", zIndex: "1000" }}>
      <div style={{ width: "75%", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
     
                        
                       
        <div>
          <div style={{ display: "flex", alignItems: "left", gap: "2rem", textDecoration: "none" }}>
          <p className="text-xl uppercase">
              <span className="text-3xl text-green-400">M</span>ag Laptop Rental Services
            </p>
             </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default Header