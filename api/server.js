const express = require("express");

const AccountRouter = require('../accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter)

server.get("/", (req, res) => {
   res.status(200).json({ message: 'Welcome!' });
 });
 

module.exports = server;
