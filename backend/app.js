var express = require("express");
const cors  = require("cors")

const app = express();

const port = 9897;

const account_routes = require("./routes/account_route");
const survey_routes = require("./routes/survey_route")
const plan_routes = require("./routes/plan_route")

var corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credential: true,
  optionsSuccessStatus: 204
}

app.use(express.json());
app.use(cors(corsOptions))
app.use(account_routes)
app.use(survey_routes)
app.use(plan_routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;