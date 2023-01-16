import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import Buy from "../pages/BuyNow";



function ListProducts({ obj }) {
    const id = obj._id;
	const navigate = useNavigate();
  	if(localStorage.getItem('token') == null){
	    navigate("/login");
  	}
    const [img,setImg] = useState(`${id}.jpg`);
    return (
		<>
			<div style={{padding:"2%"}} class="card">
				<img
                      src = {require(`../../../FinalProject-BootCamp-FinalProject/FrontEnd/src/productPictures/${img}`)}
                      style={{ width: "70%",borderRadius:"50px"}}
					  onError= {("../../../FinalProject-BootCamp-FinalProject/FrontEnd/src/productPictures/1.jpg")}
				/>
				<h2>{obj?.title}</h2>
				<p class="price">${obj?.price}</p>
                <div style={{display:"flex",flexDirection:"row"}}>
					<button style={{fontSize:"18px",backgroundColor:"#FF8700",color:"black",borderRadius:"20px",fontWeight:"bold"}} onClick={()=>{navigate("/buynow/"+id)}} >Buy Now</button>
                    <button style={{marginLeft:"5px",fontSize:"18px",backgroundColor:"#FF8700",color:"black",borderRadius:"20px",fontWeight:"bold"}} onClick={()=>{navigate("/productdetail/"+id)}}>Details</button>
                </div>
			</div>
			<ToastContainer />
		</>
	);
}
export default ListProducts;
