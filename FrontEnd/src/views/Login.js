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
import { useHistory } from "react-router";


function Login() {
    const [response,setResponse] = useState();
    const history = useHistory();
    if(localStorage.getItem('token') != null){
        history.push("/admin/dashboard");
    }
    const getData = (event)=>{
        event.preventDefault();
        const data = {"email":event.target[0].value,"password":event.target[1].value};
        axios.post("http://localhost:3000/admin/login/",data).then(function (response) {
        
        setResponse(response.data);
        localStorage.setItem("token",response.data);
        
        toast.success("Login Success",{position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",});

        if(localStorage.getItem('token') != null){
            history.push("/admin/dashboard");
        }
      });
    }
  return (
    <>
        <Container className="centered">
            <Row style={{marginTop:"150px"}}>
            <Col className="mx-auto" lg="4" md="8" >
                <Form style={{border:"1px solid black"}} action="" className="form" method="" onSubmit={getData}>
                    <Card className="card-login">
                        <Card.Header className="text-center">
                            <div className="logo-holder d-inline-block align-top">
                            <h2>Admin Login</h2>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Body>
                                <Form.Group>
                                <label style={{paddingRight:"15px",fontSize:"20px"}} className="form-label" htmlFor="name"/>
                                    <Form.Control style={{border:"1px solid black"}} placeholder="Enter Email" type="text" name="email"  />
                                </Form.Group>
                                <Form.Group>
                                <label className="form-label" htmlFor="email"/>
                                    <Form.Control style={{border:"1px solid black"}} placeholder="Enter Password" type="password" name="password" />
                                </Form.Group>
                            </Card.Body>
                        </Card.Body>
                        <Card.Footer className="ml-auto mr-auto">
                            <Button style={{border:"2px solid"}} className="btn-filled" type="submit">Login</Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </Col>
            </Row>
        </Container>
        <ToastContainer/>
    </>
  );
}

export default Login;