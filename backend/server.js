require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const tripsRoutes = require("./routes/trips");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api/trips", tripsRoutes);
app.use("/api/user", userRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                `connected to db and listening on port ${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
