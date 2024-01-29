import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/UsersRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;
const BASE_URL = process.env.BASE_URL;

//middleWares------------------------------------------------------------------------------------------------
app.use(express.static("../client"));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.use(BASE_URL, userRoutes);

//baseServer------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the  Task Planner.....");
});

//for_unknown_Url-------------------------------------------------------------------------------------
app.all("*", (req, res) => {
  res
    .status(404)
    .send(`<h1>Page not found</h1> <a href="/">Click here go to homepage</a>`);
});

//serverPort listen fn--------------------------------------------------------------------------------------
mongoose
  .connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected to the database successfully`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
