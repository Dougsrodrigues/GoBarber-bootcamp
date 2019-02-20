const express = require("express");
const session = require("express-session"); // armazena os dados da sessão no servidor para manter o login do user
const FileStore = require("session-file-store")(session); // salvar os arquivos session em json
const nunjucks = require("nunjucks");
const path = require("path");
const flash = require("connect-flash"); // enviar mensagens

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV != "production";
    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(flash());
    this.express.use(
      session({
        name: "root",
        secret: "MyAppSecret", // criptografar a sessão
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, "..", "temp", "sessions")
        }),
        saveUninitialized: false
      })
    );
  }
  views() {
    nunjucks.configure(path.resolve(__dirname, "app", "views"), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    });
    this.express.use(express.static(path.resolve(__dirname, "public")));
    this.express.set("view engine", "njk");
  }
  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
