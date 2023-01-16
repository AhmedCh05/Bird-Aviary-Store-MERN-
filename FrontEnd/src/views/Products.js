import React from "react";
import axios from "axios";
import Product from "./ListProducts";
import { useState,useEffect } from "react";
import { useHistory } from "react-router";
import {faKiwiBird } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core' // <-- import styles to be used

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";



function TableList() {
  const history = useHistory();
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
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <Card.Title as="h4">List of Products</Card.Title>
                <FontAwesomeIcon title="Add Product" style={{fontSize:"30px",marginRight:"5px"}} icon={faKiwiBird} onClick={()=>{history.push("/admin/addproduct")}}/>
              </div>
                <p className="card-category">
                  ALL PRODUCTS REGISTERED
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr style={{border:"2px Solid Black"}}>
                      <th className="border-0">Title</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Quantity</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Description</th>
                    </tr>
                  </thead>
                  <tbody>
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
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
