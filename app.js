const express = require('express')
const app = express()
const path = require('node:path')

const indexRouter = require('./routes/indexRouter')
const muscleRouter = require('./routes/muscleRouter')
const exerciseRouter = require('./routes/exerciseRouter')
const pairsRouter = require('./routes/exerciseMuscleRouter')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


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
