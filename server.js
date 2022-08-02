// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Here we are requiring Express
const express = require("express");

// setting the port number
const port = 8010;
// Creat the app
const app = express();

// Here we are requiring Cors to use it
const cors = require("cors");
app.use(cors());

// Including body parser
const bodyParser= require("body-parser");

// using the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Initialize the main project folder
app.use(express.static('website'));

// end point  and call back function in order to accept post requests from the front end 
app.post('/postData', (req,res)=>
{
    try
    {
        projectData = req.body;
        console.log(projectData);
        res.send(projectData);
    }
    catch(error)
    {
        res.send({message:error}) ;
    }
});

// end point  and call back function in order to accept get requests from the front end 

app.get('/currentData', (req,res)=>
{
    try
    {
        res.send(projectData)
    }
    catch(error)
    {
        res.send({message:error}) ;
    }
});

// Setup Server
app.listen(port, ()=>
{
    console.log('The server is running');
    console.log(`The port number is: ${port}`);
});