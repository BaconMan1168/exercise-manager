const express = require('express')
const app = express()
const path = require('node:path')
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

const indexRouter = require('./routes/indexRouter')
const muscleRouter = require('./routes/muscleRouter')
const exerciseRouter = require('./routes/exerciseRouter')
const pairsRouter = require('./routes/exerciseMuscleRouter')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use('/', indexRouter);
app.use('/muscles', muscleRouter);
app.use('/exercises', exerciseRouter);
app.use('/pairs', pairsRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Exercise Manager - listening on port ${PORT}!`);
});
