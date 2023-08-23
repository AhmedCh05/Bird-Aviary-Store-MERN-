import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Order({ id }) {
	const history = useHistory();
	const params = useParams();
	const Orderid = params.id;
	const [response, setResponse] = useState("");
	const [orderStatus, setOrderStatus] = useState("");

	useEffect(() => {
		axios.get("http://localhost:3000/Order/" + params.id).then((res) => {
			setResponse(res.data);
			toast.success("Order Details Fetched", {
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

		setOrderStatus(response.status);
	}, []);

	function UpdateOrder(event) {
		event.preventDefault();
		console.log(event.target[1].value);
		const data = {
			_id: event.target[0].value,
			status: event.target[1].value,
			productID: event.target[2].value,
			quantity: event.target[3].value,
			userID: event.target[4].value,
			phoneno: event.target[5].value,
			address: event.target[6].value,
		};
		console.log(data);
		axios
			.put("http://localhost:3000/Order/" + response._id, data)
			.then(function (response) {
				toast.success(`Order Status set To ${orderStatus}`, {
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
					<Col md="12">
						<Card>
							<Card.Header>
								<Row
									style={{
										display: "flex",
										flexDirection: "row",
										margin: "5px",
									}}>
									<FontAwesomeIcon
										style={{
											fontSize: "35px",
											marginRight: "15px",
										}}
										icon={faArrowLeft}
										onClick={() => {
											history.push("/admin/allOrders");
										}}
										Back
										To
										All
										Orders
									/>
									<Card.Title as="h4">
										Order Details
									</Card.Title>
								</Row>
							</Card.Header>
							<Card.Body>
								<Form onSubmit={UpdateOrder}>
									<Row>
										<Col className="pr-1" md="7">
											<Form.Group>
												<label>Order ID</label>
												<Form.Control
													value={response._id}
													disabled
													placeholder="Order ID"
													type="text"></Form.Control>
											</Form.Group>
										</Col>
										<Col className="pr-1" md="3">
											<Form.Group>
												<label>Status</label>
												<Form.Control
													as="select"
													value={orderStatus}
													placeholder="Order Status"
													onChange={(e) => {
														setOrderStatus(
															e.target.value
														);
													}}>
													<option value="Pending">
														Pending
													</option>
													<option value="Processing">
														Processing
													</option>
													<option value="Completed">
														Completed
													</option>
													<option value="Cancelled">
														Cancelled
													</option>
												</Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<h4 style={{ paddingLeft: "20px" }}>
											Product Details
										</h4>
									</Row>
									<Row>
										<Col className="pr-1" md="4">
											<Form.Group>
												<label>Product ID</label>
												<Form.Control
													value={response.productID}
													placeholder="Product ID"
													type="text"
													disabled></Form.Control>
											</Form.Group>
										</Col>
										<Col className="pr-1" md="4">
											<Form.Group>
												<label>Product Quantity</label>
												<Form.Control
													value={response.quantity}
													placeholder="Product Quantity"
													type="text"
													disabled></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<h4 style={{ paddingLeft: "10px" }}>
										User Details
									</h4>
									<Row>
										<Col className="pr-1" md="4">
											<Form.Group>
												<label>User ID</label>
												<Form.Control
													value={response.userID}
													placeholder="User ID"
													type="text"
													disabled></Form.Control>
											</Form.Group>
										</Col>
										<Col className="pr-1" md="3">
											<Form.Group>
												<label>Phone No</label>
												<Form.Control
													value={response.phoneno}
													placeholder="Cell No"
													type="tel"
													disabled></Form.Control>
											</Form.Group>
										</Col>
										<Col className="pr-1" md="4">
											<Form.Group>
												<label>User Address</label>
												<Form.Control
													value={response.address}
													placeholder="User Address"
													type="text"
													disabled></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<div
										style={{
											paddingLeft: "10px",
											paddingTop: "15px",
										}}>
										<Button
											className="btn-fill pull-right"
											type="submit"
											variant="info">
											Update Order Status
										</Button>
									</div>
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

export default Order;
