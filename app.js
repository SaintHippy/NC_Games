const express = require("express");
const cors = require("cors");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors/errors"); //send errors off for someone else to sort out
const apiRouter = require("./routers/api.router");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter); //everything will go through this to keep app nice and clean

app.use(handleCustomErrors); //first error check
app.use(handlePsqlErrors); //next error check
app.use(handleServerErrors); //final error check including 500 failsafe

module.exports = app;
