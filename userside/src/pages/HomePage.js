import React from "react";
import axios from "axios";
import Product from "../components/ListProducts";
import { useState, useEffect } from "react";
import "../assets/css/productpage.css"
import { Button, Container } from "react-bootstrap";
import Navbar from "../components/Navigationbar";
import background from "../assets/images/main.png";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core'



function TableList() {
  const [response, setResponse] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate("/login");
    }
  }, []);
  const myStyle = {
    backgroundImage: `url(${background})`,
    height: '100vh',
    marginTop: '-70px',
    fontSize: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: '0.8'
  };
  const getDatabyCategory = async (obj)=>{
    await axios.get("http://localhost:3000/ProductCatt/"+obj).then((res) => {
      setResponse(res.data);
      console.log("data",response)
    });
  }

return (
    <>
    <Navbar />
    <div style={myStyle}>
      <div>
        <h6 style={{ paddingTop: "20%", textAlign: "left", paddingLeft: "200px", fontSize: "30px", fontFamily: "Bradley Hand, cursive" }}>Get Exotic Birds</h6>
        <FontAwesomeIcon title="All Products" style={{ display: "block", fontSize: "30px", textAlign: "left", paddingLeft: "280px", color: "red" }} icon={faBagShopping} onClick={() => { navigate("/allproducts") }} />

      </div>
    </div>
    <div style={{display:"flex",justifyContent:"center",paddingTop:"20px"}}>
    <h1 style={{padding:"2%" , border:"2px dashed white",borderRadius:"10px"}}>Display By Category</h1>
    </div>
    <div style={{padding:"2%",display:"flex",justifyContent:"space-evenly"}}>
      <div><Button style={{padding:"10px",borderRadius:"10px"}} onClick={()=>{getDatabyCategory("exotic")}}>Exotic</Button></div>
      <div><Button style={{padding:"10px",borderRadius:"10px"}} onClick={()=>{getDatabyCategory("midranged")}}>MidRanged</Button></div>
      <div><Button style={{padding:"10px",borderRadius:"10px"}} onClick={()=>{getDatabyCategory("small")}}>Small</Button></div>

    </div>

              <Container style={{ display: "flex", flexDirection: "row", justifyContent: "spaceAround" }} fluid>
                <>
                  {response?.map((i) => {
                    return (
                      <>
                        <Product obj={i}>
                        </Product>
                      </>
                    )
                  }

                  )}
                </>
              </Container>
            </>
            );
}

export default TableList;
