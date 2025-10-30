const express = require('express')
const app = express()
const path = require('node:path')

const indexRouter = require('./routes/indexRouter')
const muscleRouter = require('./routes/muscleRouter')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use('/', indexRouter);
app.use('/muscles', muscleRouter);