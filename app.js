const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const loginRoute = require('./routes/login.routes');
const indexRouter = require("./routes/index");
const insertData = require("./routes/insertData");
const update = require("./routes/update");
const getRows = require("./routes/getRows");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use("/", indexRouter);
app.use("/insertData", insertData);
app.use("/update", update);
app.use("/getRows", getRows);
app.use("/login", loginRoute);
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
