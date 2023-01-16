import React, { useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";


function Login() {
    const [response,setResponse] = useState();
    const navigate = useNavigate();
    if(localStorage.getItem('token') != null){
        navigate("/home");
    }

    const getData = (event)=>{
        event.preventDefault();
        const data = {"email":event.target[0].value,"password":event.target[1].value};
        axios.post("http://localhost:3000/User/login/",data).then(function (response) {
        localStorage.setItem("token",response.data);
        toast.success("User Login Success",{position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",});
        if(localStorage.getItem('token') != null){
            navigate("/home");
        }
      }).catch((err)=>{
        toast.error("User Credentials Doesn't Match",{position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",});
      });
    }
    return (
        <>
          <Container>
            <Row >
              <Col >
                <Card>
                  <Card.Header>
                    <Card.Title style={{paddingTop:"40%",paddingBottom:"10%"}} as="h1">User Login</Card.Title>
                  </Card.Header>
                  <Card.Body>
                  <Form onSubmit={getData}>
                      <Row>
                        <Col>
                          <Form.Group>
                            <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Email</label>
                            <Form.Control
                            style={{fontSize:"17px"}}
                              placeholder="Email"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group>
                            <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Password</label>
                            <Form.Control
                            style={{fontSize:"17px"}}
                              placeholder="password"
                              type="password"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <div>
                      <Button
                        className="btn-fill pull-right"
                        style={{marginTop:"50px",backgroundColor:"black",color:"white",border:"2px dashed white",fontSize:"18px",borderRadius:"8px"}}
                        type="Submit"
                        variant="info"
                      >
                        Login
                      </Button>
                      </div>
                    </Form>
                    <h4 style={{marginTop:"60px"}} >Not a User ? .. Join Now</h4>
                    <Button
                        className="btn-fill pull-right"
                        style={{marginTop:"10px",backgroundColor:"black",color:"white",border:"2px dashed white",fontSize:"15px",borderRadius:"10px",width:"90px"}}
                        onClick={()=>{navigate("/signup")}}
                        variant="info"
                      >
                      Sign Up
                      </Button>
                      </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <ToastContainer/>
        </>
      );
    }

export default Login;