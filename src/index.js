const express = require("express");
const http = require("http");
const port = process.env.PORT || 8080;
const cors = require("cors");
require('./db/mongoose');
const goodsRouter = require('./routers/goods');
const expenseRouter = require('./routers/expenses');
const contactRouter = require('./routers/contacts');
const itemsRouter = require('./routers/items');
const notesRouter = require('./routers/notes');
const authRouter = require('./routers/authentication');


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

app.use('/',authRouter);
app.use('/',goodsRouter);
app.use('/',expenseRouter);
app.use('/',contactRouter);
app.use('/',itemsRouter);
app.use('/',notesRouter);

server.listen(port, () => console.log(`Listening on port ${port}`));