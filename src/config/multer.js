const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

module.exports = {
  //salvar os arquivos no disco
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "tmp", "uploads"),

    //adicionar caracteres unicos no arquivo para arquivos do msm nome n se substituirem
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err);
        //pega um numero aleatorio e concatena c o nome do arquivo original
        cb(null, raw.toString("hex") + path.extname(file.originalname));
      });
    }
  })
};
