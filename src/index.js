require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {authRouter} =  require('./routes/authRouter')
const {studentRouter} = require("./routes/studentRoutes");
const {uploadRouter} = require("./routes/uploadRouter")
const path = require("path");
// cors 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api", uploadRouter); 
app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);



// error handling miidle ware
app.use((err, req, res, next) => {
  console.log('Error', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'something went wrong';
  const isOperational = err.isOperational || false;
  if (isOperational) {
    res.status(statusCode).json({
      success: false,
      message: message
    })
  } else {
    res.status(statusCode).json({
      success: false,
      error: 'internal server error'
    })
  }
})

module.exports = app;
