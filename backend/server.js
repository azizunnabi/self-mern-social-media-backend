const express = require("express");
const cors= require("cors");
const { connection } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

require("dotenv").config();
const app = express();
const PORT = 5001;
connection();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", postRoutes);
app.get("/home", (req, res)=>{
    return res.status(200).json({msg: "welcome in Social meda app"})
})
app.listen(PORT, ()=>{
    console.log(`your server is running on port no ${PORT}`)
})