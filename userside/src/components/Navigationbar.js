import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
  } from '../pages/NavbarElements';  

const Navigationbar = () => {
    return (
      <>
        <Nav style={{backgroundColor:"black",color:"white",margin:"75px"}}>
          <Bars />
          <NavMenu>
          <NavLink to='/home' activeStyle>
              Home
            </NavLink>
            <NavLink to='/allproducts' activeStyle>
              Products
            </NavLink>
            <NavLink to='/contact' activeStyle>
              Contact
            </NavLink>
            <NavLink to='/faq' activeStyle>
              FAQ
            </NavLink>
            <NavLink to='/postquestion' activeStyle>
              Ask Question
            </NavLink>
            <NavLink to='/about' activeStyle>
              About
            </NavLink>
          </NavMenu>
          <NavBtn>
            <NavBtnLink style={{borderRadius:"20px"}} onClick={()=>{setTimeout(() => {localStorage.removeItem('token')}, 1000);}} to='/login'>Log Out</NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    );
  };
    
  export default Navigationbar;