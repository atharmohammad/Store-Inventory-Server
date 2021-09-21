const jwt = require("jsonwebtoken");
const Shops = require("../models/shops");
const mongoose = require("mongoose");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if(!token){
      throw new Error();
    }
    const decodedKey = jwt.verify(token, process.env.JWT_SECRET);

    const shop = await Shops.findOne({
      _id: decodedKey._id,
      token: token,
    });
    if (!shop) throw new Error();

    req.token = token;
    req.shop = shop;
    
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate !" });
  }
};

module.exports = auth;