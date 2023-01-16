import React from "react";
import { useState,useEffect } from "react";
import { useParams,useHistory } from "react-router";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Button,Card,Form,Container,Row,Col} from "react-bootstrap";
import {faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Product({id}) {
  
  const history = useHistory();
  const params = useParams();
  const productid = params.id;
  const [response,setResponse] = useState("");
  const [state,setState] = useState(null);
  const [imagePresent,setImagePresent] = useState("1.jpg");
  
  useEffect(()=>{
  axios.get("http://localhost:3000/Product/"+(params.id)).then((res)=>
  {
    setResponse(res.data);
  })
  },[]);

  const handleFileSelect = (event) => {
    setState(event.target.files[0]);
  }

  const handleSubmit = async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("upload", state);
    const response = await axios.post("http://localhost:3000/Product/producticon/"+productid,formData).then((res)=>{
    setTimeout(() => {
      setImagePresent(`${productid}.jpg`);
    }, 3000);   
        toast.success("File Uploaded Successfully", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }).catch((error)=>{
        toast.error("Not Uploaded Successfully", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(error.message);})
      
  }
  
  function UpdateProduct(event) {
    event.preventDefault();
    const data = {"_id":event.target[0].value,"title":event.target[1].value,"price":event.target[2].value,"Quantity":event.target[3].value,"category":event.target[4].value,"description":event.target[4].value};
    console.log(data);
      axios.put("http://localhost:3000/Product/"+(params.id),data)
			.then(function (response) {
        setResponse(data);
        toast.success("Product Updated", {
					position: "top-right",
					autoClose: 8000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			});
  }


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="10">
            <Card>
              <Card.Header style={{display:"flex",flexDirection:"row"}} >
                <FontAwesomeIcon title="Back To Home" style={{fontSize:"30px",paddingRight:"15px"}} icon={faArrowLeft} onClick={()=>{history.push("/admin/allProducts")}} Back To All Products/>
                <Card.Title  as="h4">Product Details Page</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                <Col md="8">
                <Form onSubmit={UpdateProduct}>
                    <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Product ID</label>
                        <Form.Control
                          defaultValue = {response._id}
                          disabled
                          placeholder="Product ID"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Title</label>
                        <Form.Control
                          defaultValue = {response.title}
                          placeholder="Title"
                          type="text"
                          
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                </Row>
                <Row>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          defaultValue = {response.price}
                          placeholder="Price"
                          type="text"
                          
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Quantity</label>
                        <Form.Control
                        defaultValue = {response.quantity}
                        placeholder="Quantity"
                        type="text"
                        
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Category</label>
                        <Form.Control
                          defaultValue = {response.category}
                          placeholder="Category"
                          type="text"
                          
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-5" md="12">
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control as ='textarea'
                          defaultValue = {response.description}
                          placeholder="Category"
                          
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Date Modified</label>
                        <Form.Control
                          defaultValue = {response.datecreated}
                          placeholder="Date Modified"
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Product Info
                  </Button>
                  </div>
                </Form>
                </Col>
                <Col md="1">
                  <div style={{height:200,width:200}}>
                  <img
                      alt="..."
                      src = {require(`../productPictures/${imagePresent}`)}
                      style={{height:"200px",width:"200px",borderRadius:"200%"}}
                    ></img>
                  </div>
                  <div>
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
                      <input style={{padding:"10px",fontSize:"12px",marginTop:"10px"}} name="upload" type="file" onChange={handleFileSelect}/>
                    <input style={{fontSize:"12px",marginLeft:"100px"}}type="submit" value="Submit" />
                  </form>
                  </div>
                </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
      <ToastContainer/>
    </>
  );
}

export default Product;
