import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navigationbar";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Card,Form,Row,Col} from "react-bootstrap";



function BuyNow(id) {
  const [response, setResponse] = useState();
  const params = useParams();
  const [productDetail,setProductDetail] = useState();
  const token = localStorage.getItem('token');
  const config = {headers:{Authorization:`Bearer ${token}`}};
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate("/login");
    }
  }, []);
  axios.get("http://localhost:3000/Product/"+params.id).then(function (res) {
        setProductDetail(res.data);
      });
  function handleSubmit(event) {
    event.preventDefault();
    const data = {"productID":event.target[0].value,"quantity":event.target[2].value,"address":event.target[3].value,"phoneno":event.target[4].value,"status":event.target[5].value};
    axios.post("http://localhost:3000/addOrder",data,config)
    .then(function (response) {
      toast.success("Order Placed",{position: "top-right",
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
                <Card.Title style={{paddingBottom:"8%"}} as="h1">Order Form Page</Card.Title>
              </Card.Header>
              <Card.Body>
              <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"10px"}}>Product ID</label>
                        <Form.Control
                        style={{fontSize:"17px",backgroundColor:"black",color:"white",border:"1px solid white"}}
                        type="text"
                        value={params.id}
                        disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"10px"}}>Product Name</label>
                        <Form.Control
                        style={{fontSize:"17px",backgroundColor:"black",color:"white",border:"1px solid white"}}
                        type="text"
                        value={productDetail?.title}
                        disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Quantity</label>
                        <Form.Control
                        style={{fontSize:"17px",backgroundColor:"black",color:"white",border:"1px solid white"}}
                          placeholder="Quantity"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Address</label>
                        <Form.Control
                        style={{fontSize:"17px",backgroundColor:"black",color:"white",border:"1px solid white"}}
                        placeholder="Address"
                        type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Phone No</label>
                        <Form.Control
                        style={{fontSize:"17px",backgroundColor:"black",color:"white",border:"1px solid white"}}
                        placeholder="PhoneNo"
                        type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div>
                  <Button
                    className="btn-fill pull-right"
                    style={{marginTop:"50px",backgroundColor:"yellow",color:"black",border:"2px dashed white",fontSize:"18px",borderRadius:"8px"}}
                    type="Submit"
                    variant="info"
                  >
                    Confirm Order
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

export default BuyNow;
