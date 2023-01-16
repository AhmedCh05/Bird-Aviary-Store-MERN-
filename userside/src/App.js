import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./pages/AboutUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FAQ from "./pages/FAQ";
import PostQuestion from "./pages/PostQuestion"
import Contact from './pages/Contact';
import ProductPage from "./pages/ProductPage";
import ProductDetail from './pages/ProductDetail';
import HomePage from "./pages/HomePage";
import BuyNow from "./pages/BuyNow"
import "./assets/css/App.css"

function App() {
    return (
      <>
    <Router>
        <div className="App" style={{marginTop:"-100px",minHeight:"130vh",minWidth:"200vh",backgroundColor:"black",color:"white"}}>
          <Routes>
              <Route path='/postquestion' element={<PostQuestion/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/faq' element={<FAQ/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/signUp' element={<SignUp/>} />
              <Route path='/contact' element={<Contact/>} />
              <Route path='/allproducts' element={<ProductPage/>} />
              <Route path='/productdetail/:id' element={<ProductDetail/>} />
              <Route path='/home' element={<HomePage/>} />
              <Route path='/buynow/:id' element={<BuyNow/>} />
              <Route exact path ='/' element={<Login/>} />                

          </Routes>
        </div>
      </Router>
      </>
    );
}

export default App;
