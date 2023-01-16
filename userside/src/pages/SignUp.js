import React from "react";
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

function SignUp() {
  function handleSubmit(event) {
    event.preventDefault();
    const data = {"fname":event.target[0].value,"lname":event.target[1].value,"email":event.target[2].value,"password":event.target[3].value,"phoneno":event.target[5].value};
    console.log(data)
    axios.post("http://localhost:3000/Signup", data)
    .then(function (response) {
      toast.success("User Account Created",{position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",});
    })

  }



  return (
    <>
      <Container>
        <Row >
          <Col >
            <Card>
              <Card.Header>
                <Card.Title style={{paddingTop:"40%",paddingBottom:"10%"}} as="h1">User Sign Up</Card.Title>
              </Card.Header>
              <Card.Body>
              <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"10px"}}>First Name</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="First name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Last Name</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="Last name"
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
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Password</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="password"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Confirm Password</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="password"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Phone No</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="Phone no"
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
                    Create Profile
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

export default SignUp;
