const express = require('express')
const path = require('path')
const app = express();
const multer = require('multer')

// const upload = multer({dest : 'uploads/'}) //upload instance
const PORT = 8001;


const storage = multer.diskStorage({
    // cb = callback  
    destination : (req,res,cb) => {
        return cb(null , './uploads')
    },
    filename : (req,file,cb) => {
        return cb(null , `${Date.now()} - ${file.originalname}`)
        // used to avoid clash between two users
        //ex when two upload same file with same name
    },
})
const upload = multer({storage})
app.set('view engine' , 'ejs');
app.set('views' ,path.resolve('./views'));


// app.use(express.json());

// it helps to parse the form data
app.use(express.urlencoded({extended : false}))

app.get("/" , (req , res) => {
     return res.render("home")    
})

// this is for single file upload

// app.post('/profile' ,upload.single("profileImage") , (req,res) => {
//    console.log(req.body); //return null because we dont have txt file on our frontend

//    console.log("file" , req.file)

//    return res.redirect("/")
   
// })

// multiple file upload

app.post('/profile' ,upload.fields([{name : 'profileImage'} , {name : 'coverImage'}]) , (req,res) => {
   console.log(req.body); //return null because we dont have txt file on our frontend

   console.log("file" , req.file)

   return res.redirect("/")
   
})

app.listen(PORT , () => {
    console.log("Server is getting started");
    
})