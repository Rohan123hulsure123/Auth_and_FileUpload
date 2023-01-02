const router = require("express").Router();
const express = require("express");
const {FileHistory} = require('../models/mongooseModel');
// const upload = require("../upload");


const  S3 = require("aws-sdk/clients/s3");
const upload = require("../s3upload")


const s3 = new S3({
	accessKeyId: process.env.accessKeyId,
	secretAccessKey: process.env.secretAccessKey,
	region: process.env.REGION,
	signatureVersion: "v4",
});

//View single file
// app.use('/getSingleFile', checkAuthenticated, express.static(`${__dirname}/uploads`));

router.post("/upload_file", checkAuthenticated, upload.single("file"), function (req, res) {
	try {
		// console.log(req.file);
		if (!req.file) {
			//If the file is not uploaded, then throw custom error with message: FILE_MISSING
			console.log("FILE_MISSING");
			res.send({ code: "FILE_MISSING" });
		} else {
			//If the file is uploaded, then send a success response.
			// console.log(req.file);
			// console.log(req.user._json.email);
			const newFileHistory= new FileHistory({
				userEmail: req.user._json.email,
				fieldname: req.file.fieldname,
				originalname: req.file.originalname,
				encoding: req.file.encoding,
				mimetype: req.file.mimetype,
				destination: req.file.destination,
				filename: req.file.filename || req.file.key,
				path: req.file.path,
					size: req.file.size,
				location: req.file.location
			})
	
			newFileHistory.save(err => {
				if (err) {
					console.error(err);
					res.sendStatus(400);
				}
			})
			res.send({ status: "success" });
		}
	} catch (error) {
		console.log(error);
		res.json({
		  status: "Fail",
		  error,
		});
	  }
	
});

router.get("/getfiles", async function (req, res) {
	try {
		FileHistory.find({userEmail:req.user._json.email}).clone().sort({"createdAt":-1}).exec((err,files)=>{
			if (err) {
				console.log(err);
			} 
			// console.log(files);
			const fileArray = files.map((item, index)=>{
				return { originalname:item.originalname, filename: item.filename }
			})
			// console.log(fileArray);
			res.json(fileArray)
		})
	  } catch (error) {
		console.log(error);
		res.json({
		  status: "Fail",
		  error,
		});
	  }
})

//retrive single file from s3
router.get('/retrive/:fileName', checkAuthenticated, async (req, res)=>{
	try {
		var params = {
			Bucket: "myfileuploadbucketwithpresignedurl", 
			Key: req.params.fileName
		   };
		s3.getObject(params, function(err, data) {
		 if (err) console.log(err, err.stack); // an error occurred
		 else{
			//console.log(data);           // successful response
			res.send(data.Body)
		 }     
		});
	} catch (error) {
		console.log(error);
		res.json({
		  status: "Fail",
		  error,
		});
	}
})

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	  return next()
	}
  
	res.redirect('/auth/login/failed')
}

module.exports = router;
