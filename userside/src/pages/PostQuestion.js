import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navigationbar";
import { useEffect } from 'react';
import {
  Badge,
  Button,
  Card,
  Form,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function PostQuestion() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token') == null){
        navigate("/login");
    }
    },[]);
  function handleSubmit(event) {
    event.preventDefault();
    const data = {"name":event.target[0].value,"email":event.target[1].value,"message":event.target[2].value};
    axios.post("http://localhost:3000/contactus",data).then(function (response) {
        toast.success("Query Form Submitted",{position: "top-right",
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
    <Navbar/>
      <Container>
        <Row >
          <Col >
            <Card>
              <Card.Header>
                <Card.Title style={{paddingBottom:"10%"}} as="h1">Post a Question</Card.Title>
              </Card.Header>
              <Card.Body>
              <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"10px"}}>Name</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
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
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Message</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="Detailed Message"
                          type="text"
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
                    Post Question
                  </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </>
  );
}

export default PostQuestion;