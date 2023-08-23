// CONTROLLER FILE

require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const objectId = require("mongodb").ObjectId;
const User = require("./user.model");
const Product = require("./product.model");
const Register = require("./register.model");
const Order = require("./Order.model");
const Contact = require("./contactus.model");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {createTokens,validateToken,getUserID} = require("./Jwt");

const app = express();

app.use("/",express.static(__dirname + `../../FrontEnd/src/productPictures`));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:"*",methods:"GET,PUT,POST,DELETE"}));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_SERVER);
const Database = mongoose.connection;
Database.on("error", console.error.bind(console, "connection error: "));
Database.once("open", () => {
	console.log("Connected To Database successfully");
});

////				SIGN UP USER

app.post("/Signup", async (req, res) => {
	const {password} = req.body;
	bcrypt.hash(password,10).then(async(hash)=>{
		const user = new User({
			fname: req.body.fname,
			lname: req.body.lname,
			email: req.body.email,
			password:hash,
			phoneno: req.body.phoneno,
		});
		const H = await user.save();
		res.status(200).send("User Account Registered");
	});
	
	
});

////				LOGIN USER

app.post("/User/login",async(req,res)=>{
	const {email,password} = req.body;
	const register = await User.findOne({email:email});
	if(!register){
		return res.sendStatus(400);
	}
	const dbPassword = register.password;
	bcrypt.compare(password,dbPassword).then((match)=>{
		if(!match){
			return res.sendStatus(400);
		}
		else{
			const accessToken = createTokens(register);
			// res.json("Logged In")
			res.send(accessToken)
		}
	});
});

////				LOGIN ADMIN

app.post("/admin/login",async(req,res)=>{
	const {email,password} = req.body;
	const register = await Register.findOne({email:email});
	if(!register){
		return res.sendStatus(400).json({error:"Admin Doesn't Exist"});
	}
	const dbPassword = register.password;
	bcrypt.compare(password,dbPassword).then((match)=>{
		if(!match){
			//return res.sendStatus(400).json({error:"Admin Email and Password Combinations Are Incorrect ! "});
		}
		else{
			const accessToken = createTokens(register);
			// res.json("Logged In")
			res.send(accessToken)
		}
	});
});

////				DASHBOARD

app.get("/dashboard",validateToken,(req,res)=>{
	res.json("HELLO DASHBOARD")
});

////				CONTACT US

app.post("/contactus", async (req, res) => {
	const contactus = new Contact({
		userid: req.body._id,
		name: req.body.name,
		email: req.body.email,
		message: req.body.message,
	});
	const H = await contactus.save();
	res.status(200).send("Question Recieved");
});

////                ADD USERS

app.post("/addUser", async (req, res) => {
	const user = new User({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		phoneno: req.body.phoneno,
	});
	const H = await user.save();
	res.status(200).send("User Added");
});

////              DISPLAY All USERS

app.get("/allUsers", async (req, res)=>{
		User.find((err, result) => {
			if (err) {
				console.error(err);
				res.status(500).send(err);
				return;
			}
			res.send(result);
		});
	});

////            DISPLAY BY ID

app.get('/User/:id', (req, res) => {
  User.findOne({ _id: objectId(req.params.id) }, (findErr, result) => {
      if (findErr) {
        console.error(findErr);
        res.status(500).send(findErr);
        return;
      }
      if(result == null){
        res.status(404).send("User Not Found");

      }
      else {
        res.send(result);
      }
    });
});

////            UPDATE USER BY ID

app.put("/User/:id", (req, res) => {
	const updatedUser = req.body;
	User.updateOne(
		{ _id: objectId(req.params.id) },
		{ $set: updatedUser },
		(updateErr, result) => {
			if (updateErr) {
				console.error(updateErr);
				res.status(500).send(updateErr);
				return;
			}

			res.send({ message: "User Details successfully updated" });
		}
	);
});

////			ADD USER PICTURE

const storage = multer.memoryStorage();
const upload = multer({
	storage:storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
})

app.post('/User/profileicon/:id', upload.single('upload'), async (req, res) => {
    try {
		const id = req.params.id;
		const ext = ".jpg"
        await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toFile(__dirname + `../../FrontEnd/src/displayPictures/${id}${ext}`)
        res.status(201).send('Image uploaded succesfully')
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

////            DELETE USER BY ID

app.delete("/User/:id", (req, res) => {
	User.deleteOne({ _id: objectId(req.params.id) }, (deleteErr, result) => {
		if (deleteErr) {
			console.error(deleteErr);
			res.status(500).send(deleteErr);
			return;
		}

		res.send({ message: "User successfully deleted" });
	});
});


////                ADD Products

app.post("/addProduct", async (req, res) => {
	const product = new Product({
		title: req.body.title,
		price: req.body.price,
		quantity: req.body.quantity,
		category: req.body.category,
		description: req.body.description,
		datecreated: req.body.datecreated,

	});
	const H = await product.save();
	res.status(200).send("Product Added");
});


////              DISPLAY All Products

app.get("/allProducts", async (req, res) => {
	Product.find((err, result) => {
		if (err) {
			console.error(err);
			res.status(500).send(err);
			return;
		}
		res.send(result);
	});
});

////            DISPLAY Product BY ID

app.get('/Product/:id', (req, res) => {
  Product.findOne({ _id: req.params.id}, (findErr, result) => {
      if (findErr) {
        console.error(findErr);
        res.status(500).send(findErr);
        return;
      }
      if(result == null){
        res.status(404).send("Product Not Found");

      }
      else {
        res.send(result);
      }
    });
});

////            UPDATE PRODUCT BY ID

app.put("/Product/:id", (req, res) => {
	const updatedProduct = req.body;
	Product.updateOne(
		{ _id: objectId(req.params.id) },
		{ $set: updatedProduct },
		(updateErr, result) => {
			if (updateErr) {
				console.error(updateErr);
				res.status(500).send(updateErr);
				return;
			}

			res.send({ message: "Product Details successfully updated" });
		}
	);
});

////			ADD PRODUCT PICTURE

app.post('/Product/producticon/:id', upload.single('upload'), async (req, res) => {
    try {
		const id = req.params.id;
		const ext = ".jpg"
         await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toFile(__dirname + `../../FrontEnd/src/productPictures/${id}${ext}`)
         res.status(201).send('Product Image uploaded succesfully')
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

////            DELETE PRODUCT BY ID

app.delete("/Product/:id", async(req, res) => {
	Product.deleteOne({ _id: objectId(req.params.id) }, (deleteErr, result) => {
		if (deleteErr) {
			console.error(deleteErr);
			res.status(500).send(deleteErr);
			return;
		}

		res.send({ message: "Product successfully deleted" });
	});
});

////			ADD ORDERS

app.post("/addOrder",getUserID, async (req, res) => {
	const order = new Order({
		productID : req.body.productID,
		quantity : req.body.quantity,
		address : req.body.address,
		phoneno : req.body.phoneno,
		userID : req.user.id
	});
	const H = await order.save();
	res.status(200).send("Order Added");
});

////			DISPLAY ALL ORDERS

app.get("/allOrders", async (req, res) => {
	const data = await Order.find().populate('productID').populate('userID');
	// Order.find((err, result).populate('products') => {
	// 	if (err) {
	// 		console.error(err);
	// 		res.status(500).send(err);
	// 		return;
	// 	}
		res.send(data);
	});

////			DISPLAY PRODUCT BY CATEGORY

app.get("/ProductCatt/:category", async (req, res) => {
	const category = req.params.category;
	const data = await Product.find({category:category});
	// Order.find((err, result).populate('products') => {
	// 	if (err) {
	// 		console.error(err);
	// 		res.status(500).send(err);
	// 		return;
	// 	}
		res.send(data);
	});


////            DISPLAY ORDER BY ID

app.get('/Order/:id', (req, res) => {
	Order.findOne({ _id: objectId(req.params.id) }, (findErr, result) => {
		if (findErr) {
		  console.error(findErr);
		  res.status(500).send(findErr);
		  return;
		}
		if(result == null){
		  res.status(404).send("Order Details Not Found");
  
		}
		else {
		  res.send(result);
		}
	  });
  });
  
  ////            UPDATE ORDER BY ID
  
  app.put("/Order/:id", (req, res) => {
	  const updatedOrder = req.body;
	  Order.updateOne(
		  { _id: objectId(req.params.id) },
		  { $set: updatedOrder },
		  (updateErr, result) => {
			  if (updateErr) {
				  console.error(updateErr);
				  res.status(500).send(updateErr);
				  return;
			  }
  
			  res.send({ message: "Order Details successfully updated" });
		  }
	  ).populate('productID').populate('userID');
  });
  
  ////            DELETE ORDER BY ID
  
  app.delete("/Order/:id", (req, res) => {
	  Order.deleteOne({ _id: objectId(req.params.id) }, (deleteErr, result) => {
		  if (deleteErr) {
			  console.error(deleteErr);
			  res.status(500).send(deleteErr);
			  return;
		  }
  
		  res.send({ message: "Order Details successfully deleted" });
	  });
  });




app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});