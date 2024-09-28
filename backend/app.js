var express = require("express");
const cors  = require("cors")

const app = express();

const port = 9897;

var corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  optionsSuccessStatus: 204, 
  credentials: true,
}

app.use(express.json());
app.use(cors(corsOptions))


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;