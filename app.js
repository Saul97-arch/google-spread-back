const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const loginRoute = require("./routes/login.routes");
const getRowsRoute = require("./routes/getRows.routes");
const indexRouter = require("./routes/index");
const insertDataRoute = require("./routes/insertData.routes");
const updateByParamRoute = require("./routes/updateByParam.routes");
const getCellRoute = require("./routes/getCell.routes");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use("/", indexRouter);
app.use("/insertData", insertDataRoute);
app.use("/getRows", getRowsRoute);
app.use("/login", loginRoute);
app.use("/updateByParam", updateByParamRoute);
app.use("/getCell", getCellRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8000, () => {
  console.log(`Express started at http://localhost:8000`);
});

module.exports = app;
