const express = require('express');
const dotenv  = require("dotenv");
const mongoose = require ("mongoose");
 const cors = require("cors");

const bookRoutes = require("./routes/book_routes");
const userRoutes = require("./routes/userRoutes");

const app = express()

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const DB = process.env.MONGODB_URL;

//db coonection
  try {
    mongoose.connect(DB);
    console.log("DB connected Successfully");
  } catch (error) {
    console.log("Error while connecting Db ", error);
  }
  
  //definig route
  app.use("/book" ,bookRoutes);
  app.use("/user",userRoutes);


app.listen(PORT ,()=>{
    console.log("App is  listening at ",+PORT);
});