const express = require("express");
const apiMocker = require("connect-api-mocker");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors({ origin: true, credentials: true }));

app.use("/api", apiMocker("mock-api"));

app.listen(port, () => console.log(`Server listening on port ${port}!`));