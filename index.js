require('./models/dbConfig');

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const postsRoute = require("./routes/postsController");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute)

app.listen(3000, () => console.log("serve"));