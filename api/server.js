// server için gerekli olanları burada ayarlayın
const express = require("express");
const server = express();
const postRouter = require("./posts/posts-router");
server.use(express.json());

// posts router'ını buraya require edin ve bağlayın

server.use("/api/posts", postRouter)



module.exports = server;