import React from "react";
import axios from "axios";
import Product from "../components/ListProducts";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/productpage.css"
import {Container} from "react-bootstrap";
import Navbar from "../components/Navigationbar";



function TableList() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token') == null){
        navigate("/login");
    }
    },[]);
  const [response,setResponse] = useState();
  useEffect(()=>{
  axios.get("http://localhost:3000/allProducts").then((res)=>
  {
    setResponse(res.data);
  }
  )
  },[]);
  return (
    <>
    <Navbar/>
      <Container style={{display:"flex",flexDirection:"row",justifyContent:"wrapContent"}} fluid>
      <>
                    {response?.map((i)=>{
                      return(
                        <>
                        <Product obj = {i}>
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
