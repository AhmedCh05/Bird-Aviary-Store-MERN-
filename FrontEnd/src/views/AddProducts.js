import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react-bootstrap components
import {
	Badge,
	Button,
	Card,
	Form,
	Navbar,
	Nav,
	Container,
	Row,
	Col,
} from "react-bootstrap";

function AddProducts() {
	const [dataState, setdataState] = useState("");
	function handleSubmit(event) {
		event.preventDefault();
		const data = {
			title: event.target[0].value,
			price: event.target[1].value,
			quantity: event.target[2].value,
			category: event.target[3].value,
			description: event.target[4].value,
		};
		console.log("Hello:", data);
		axios
			.post("http://localhost:3000/addProduct", data)
			.then(function (response) {
				toast.success("Product Added", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: false,
					theme: "dark",
				});

				console.log(response.data);
			});
	}

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Add Product</Card.Title>
							</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col className="pr-1" md="6">
											<Form.Group>
												<label>Title</label>
												<Form.Control
													placeholder="Sparrow"
													type="text"></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className="pr-1" md="6">
											<Form.Group>
												<label>Price</label>
												<Form.Control
													placeholder="10"
													type="text"></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className="pr-1" md="6">
											<Form.Group>
												<label>Quantity</label>
												<Form.Control
													placeholder="4"
													type="text"></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className="pr-1" md="6">
											<Form.Group>
												<label>Category</label>
												<Form.Control
													placeholder="Small Sized Birds"
													type="text"></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className="pr-1" md="6">
											<Form.Group>
												<label>Description</label>
												<Form.Control
													placeholder="parakeet, also spelled Parrakeet, any of numerous seed-eating parrots"
													type="text"></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Button
										className="btn-fill pull-right"
										type="Submit"
										variant="info">
										Add Profile
									</Button>
									<div className="clearfix"></div>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
			<ToastContainer />
		</>
	);
}

export default AddProducts;
