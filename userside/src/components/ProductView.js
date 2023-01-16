import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../assets/css/productdetail.css"


function ProductView({obj}) {
    const [image] = useState(`${obj._id}.jpg`);
    const navigate = useNavigate();
    if(localStorage.getItem('token') == null){
      navigate("/login");
    }
    return(
      <div className='card-side side-front'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-6'>
              <img
              src = {require(`../../../FinalProject-BootCamp-FinalProject/FrontEnd/src/productPictures/${image}`)}
              onError= {("../../../FinalProject-BootCamp-FinalProject/FrontEnd/src/productPictures/1.jpg")}
              />
              
            </div>

            <div className='col-xs-6 side-front-content'>
              <h2>Czech based</h2>

              <h1>UI/UX Designer</h1>

              <p>Andrey is driven by turning ideas into scalable and and empowering experiences that solve real life problems.</p>

              <p>He is currently the founder of Dvorak Media. Previously, Andrey was a product designer at Dropbox.</p>

              <p>Over the years, Michael has been priviledged to have worked with Adobe, Evernote, Square and more.</p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProductView;