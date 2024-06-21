import connectDB from './db/index.js'
import dotenv from "dotenv";
import express from 'express';
import router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();

const app=express();
app.use(cors());

const PORT=8000;

//this should come before routes
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',router);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
app.listen(PORT,()=>{
    console.log(`Server is running successfully on PORT ${PORT}!`)
})
connectDB();