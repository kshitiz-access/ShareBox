const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const connectDB = require("./config/db");
connectDB();


app.use(express.static("public"));
app.use(express.json());

// CORS
const corsOptions = {
    origin : process.env.ALLOWED_CLIENTS.split(",")
};

app.use(cors());

// Template Engines
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes initialization

app.use("/api/files" , require("./routes/files"));
app.use("/files" , require("./routes/show"));
app.use("/files/download" , require("./routes/download"));


app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
});