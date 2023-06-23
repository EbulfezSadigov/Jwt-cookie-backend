const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json({ limit: "20mb" }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use('/api/users',require('./routes/AuthRoutes'))

const port = 8080;
app.listen(port, () => {
    console.log("Server Worked");
});

mongoose.set("strictQuery", true);

mongoose
    .connect(
        "mongodb+srv://abulfaz:ebulfez1970@cluster0.ruexthu.mongodb.net/",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("DataBase Connected");
    })
    .catch((err) => {
        console.log(err);
    });