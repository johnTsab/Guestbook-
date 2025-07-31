//1. IMPORTS
const express = require('express');
app = express();
const cors = require('cors');
const PORT = process.env.port || 3000;
const mysql2 = require('mysql2');


//2. CREATE SERVER

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    "extended" : false
}))

app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`);
})


//3. CREATE MYSQL CONNECTION  & POOL

//4. CREATE CONTROLLER - CRUD FUNCTIONALITIES

