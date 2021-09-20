const express = require("express");
const http = require("http");
const port = process.env.PORT || 8080;
const cors = require("cors");

const app = express();
//Initialising the server instance
const server = http.createServer(app);

//Applying the middlewares
app.use(
  cors({
      "origin": '*',
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 200
  })
);

app.use(express.json());
//Server waking route
app.get('/',(req,res)=>{
  return res.status(200).send({ title: 'Waking Call..' });
})


server.listen(port, () => console.log(`Listening on port ${port}`));