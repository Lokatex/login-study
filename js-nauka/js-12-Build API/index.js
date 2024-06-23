const fs = require("fs/promises");
const express = require("express");
const cros = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

app.listen(3000, () => console.log("API Server is running..."));
