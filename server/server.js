require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require("passport");
const mongoose=require('mongoose')
const authRoute = require("./routes/auth");
const fileOpRoute = require("./routes/fileOperations");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const helmet = require("helmet");
// const upload = require("./s3upload")
// const {FileHistory} = require('./models/mongooseModel');
// const multer = require("multer");


const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		name: "session",
		keys: [process.env.COOKIE_KEY],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// Db connection
mongoose.connect(process.env.mongoDBConnection,{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("Database is connected ")
})

//auth routes
app.use("/auth", authRoute);

//file upload routes
app.use("/",fileOpRoute);

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	  return next()
	}
  
	res.redirect('/auth/login/failed')
}


app.use(express.static(`${__dirname}/uploads`));

app.get('/getSingleFile/:fileName', checkAuthenticated, (req, res) => {
	// console.log(req.params.fileName);
	res.download('uploads/'+req.params.fileName)
});

// catch 404
app.use(function (req, res, next) {
	res.status(404).redirect(process.env.CLIENT_URL+'/test');
 });
  
  // global error handler
app.use(function (err, req, res, next) {
	res.status(500).send();
});
  

  
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
