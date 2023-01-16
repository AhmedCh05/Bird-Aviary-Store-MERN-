import React from "react";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {Card,Form,Container,Row,Col} from "react-bootstrap";
import Navbar from "../components/Navigationbar"
import {faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function ProductDetail({id}) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token') == null){
            navigate("/login");
        }
        },[]);
    const params = useParams();
    const productid = params.id;
  const [response,setResponse] = useState("");
  const [imagePresent,setImagePresent] = useState(`1.jpg`);
  
  useEffect(()=>{
  axios.get("http://localhost:3000/Product/"+(params.id)).then((res)=>
  {
    setResponse(res.data);
    setTimeout(() => {
      setImagePresent(`${productid}.jpg`)
    }, 2000);
  })
  },[]);

  return (
    <>
    <Navbar/>
      <Container>
        <Row >
          <Col >
            <Card>
              <Card.Header style={{display:"flex",flexDirection:"row"}}>
              <FontAwesomeIcon title="Back To Home" style={{fontSize:"30px",paddingRight:"15px"}} icon={faArrowLeft} onClick={()=>{navigate("/allproducts")}} Back To All Products/>
                <Card.Title style={{paddingBottom:"10%"}} as="h1">Product Detail</Card.Title>
                <div style={{marginLeft:"90%",height:200,width:200}}>
                  <img
                      alt="..."
                      src = {require(`../../../FinalProject-BootCamp-FinalProject/FrontEnd/src/productPictures/${imagePresent}`)}
                      style={{height:"200px",width:"200px",borderRadius:"200%"}}
                    ></img>
                  </div>
              </Card.Header>
              <Card.Body>
              <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"10px"}}>Title</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="Title"
                          value={response?.title}
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Price $</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="Price"
                          value={response?.price}
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Items Available</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="Inventory count"
                          type="text"
                          value={response?.quantity}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Category</label>
                        <Form.Control
                        style={{fontSize:"17px"}}
                          placeholder="Category"
                          type="text"
                          value={response?.category}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label style={{display:"block",textAlign:"left",fontSize:"20px",paddingBottom:"10px",paddingTop:"20px"}}>Description</label>
                        <Form.Control as="textarea"
                        style={{fontSize:"17px"}}
                          placeholder="description"
                          type="text"
                          value={response?.description}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetail;
